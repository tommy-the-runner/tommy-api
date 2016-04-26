'use strict'

const _ = require('lodash')

const getValue = require('get-value')
const setValue = require('set-value')

const config = require('config')
const getPlugins = require('../../src/plugins')
const getServer = require('../../src/server')

const agent = require('supertest-as-promised').agent

let exerciseCollection
let Exercise

const exposePlugin = {}
exposePlugin.register = function (server, options, next) {
    exerciseCollection = server.plugins.model.exerciseCollection
    Exercise = server.plugins.model.Exercise

    next()
}

exposePlugin.register.attributes = {
    name: 'expose-plugin',
    version: '1.0.0',
    dependency: ['model']
}

class HapiWorld {
    constructor(){
        this.hapiServer = null
        this.request = null
    }

    setUp() {
        return this.startServer()
    }

    tearDown() {
        return this.stopServer()
    }

    startServer(extraConfig) {
        const appConfig = _.extend({}, config, extraConfig)

        const server = getServer(appConfig)
        const plugins = getPlugins(appConfig)

        this.hapiServer = server

        return Promise.resolve()
            .then(() => server.register(plugins.list, plugins.options))
            .then(() => server.register(exposePlugin))
            .then(() => server.start())
            .then(() => {
                this.request = agent(server.listener)
            })
            .catch(err => console.log(err, err.stack))
    }

    stopServer() {
        if (!this.hapiServer) {
            return Promise.resolve()
        }

        return this.hapiServer.stop()
    }
}

class RequestableHapiWorld extends HapiWorld {
    constructor() {
        super()

        this.currentPayload = {}
    }

    setPayloadPropertyIfNotExists(name, value) {
        if (typeof getValue(this.currentPayload, name) == "undefined") {
            this.setPayloadProperty(name, value)
        }
    }

    setPayloadProperty(name, value) {
        setValue(this.currentPayload, name, value)
    }

    getPayload() {
        return this.currentPayload
    }

    getLastResponse() {
        return this.lastResponse
    }

    getLastResponseCode() {
        return this.getLastResponse().statusCode
    }

    getLastResponseBody() {
        return this.getLastResponse().body
    }

    captureLastResponse(res) {
        this.lastResponse = res
        return res
    }
}

class TommyApiWorld extends RequestableHapiWorld {
    addExercise(data) {
        const ex = Exercise.create(data.title, data.specsCode)

        return exerciseCollection.add(ex)
    }

    getExercises() {
        return this.request
            .get('/v1/exercises')
            .then(res => this.captureLastResponse(res))
    }

    getExerciseById(id) {
        return this.request
            .get(`/v1/exercises/${id}`)
            .then(res => this.captureLastResponse(res))
    }
}

module.exports = function () {
    this.World = TommyApiWorld

    this.Before(function (scenario, callback) {
        this.setUp().then(() => callback())
    })

    this.After(function (scenario, callback) {
        this.tearDown().then(() => callback())
    })
}
