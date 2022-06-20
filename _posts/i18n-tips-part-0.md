---
title: "I18N Tips - part0"
excerpt: "Sharing some thoughts I have during my first half year as a front-end engineer."
category: "JS Dev"
coverImage: "/assets/chrome.png"
date: "2022-06-17"
author:
  name: Zihao
  picture: "/assets/blog/authors/tim.jpeg"
tags: "js,js-international"
---


## I18N Tips - part 0

This June has marked the half journey of year 2022, as well as my half-year career life as a junior front-end developer. As a FE developer, my job directly relates to customers' experience on our platform. Here I would like to share two useful small tips to help you build an i18n mindset to drive your success.

### Mock a foreign user's experience

When you are running tests, treat yourself as an **actual** foreign user.

- Case


Earlier this year, I took part in a project implementing a form which includes asking for user's phone number. I did the implementation-
```javascript
...
    const [phoneNumber, setPhoneNumber] = React.useState('');

    render() {
        <PhoneNumberInput  onBlur={(e) => setPhoneNumber(e.target.value)}/>
    }
...
```
I wrote the unit test-
```javascript
it("should get the correct phone number", () => {
    ...
    render(<MyFormComponent formData={formData}/>)
    ... // mock user input action of adding a phone number "123-456-7890"
    expect(formdata.phoneNumber).toBe("123-456-7890")
})
```
Later I ran an end to end test, I input phone number `123-456-7890` with default country number, I went through the entire flow, it was successful with no bugs no warnings, then we decide to launch with 50-50 split of A/B testing.

A few days later...I was told there's a bug preventing European customers submitting the form.

Okay, take a look at the entire implementation again, have you found anything suspicious? Yes, throughout the entire implementation, I intuitively assume there's no need to test the country code. 

- Thoughts


This kind of problem will not only exists for phone numbers, but also with address information like postal code, street number. So if you are developing an app facing global customers, run at leact 2 sets of tests, a domestic version, and a foreign version. You do not need to learn a new language to test from a foreign user's perspective. There are plenty of resources online where you can get a full set of mock user data for different regions.
A great checklist for i18n to include in your design doc is [here](https://github.com/w3c/wot-thing-description/issues/582).

### Be Careful With Text-Specific Enums
We usually want to put labels on items so that we can classify them later. However, if your label is a word, be careful with its meanings. For example, the word "manger" has very different meaning in French and English, they they share the exact same spelling. 


A case is we found the word "manger" in a French product's description, however in English, we have the keyword "Christman Manger", which is a holiday movie. Later the product was incorrectly classified under holiday section, where it should be "food" in French meaning.







