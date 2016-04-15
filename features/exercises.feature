Feature: Exercises
  As a user of Tommy The Runner Api
  I want to have access to exercises
  So that I can challenge myself

  Background:
    Given there is exercise "Sum of two numbers" with specs as in "sum.spec.js"
    And there is exercise "Multiplication of two numbers" with specs as in "multiplication.spec.js"

  Scenario: Fetching list of exercises
    Given I am the API client
    When I request for list of exercises
    Then I should see number of total exercises equal "2"
    And I should see exercise "Sum of two numbers"
    And I should see exercise "Multiplication of two numbers"
    And I should not see exercises specs

  Scenario: Fetching single exercises
    Given I am the API client
    When I request for list of exercises
    And I request details of first item
    Then I should see exercise "Sum of two numbers"
    And I should see exercise specs
