import React, { useState, useEffect} from 'react';
import "rbx/index.css";
import { Button, Container, Message, Title } from "rbx";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { timeParts, hasConflict, getCourseNumber, getCourseTerm } from './times';

const firebaseConfig = {
  apiKey: "AIzaSyCqC2z1GJu3Efmue8qxsp2TwYu4ETtDR7Q",
  authDomain: "scheduler-d7bc6.firebaseapp.com",
  databaseURL: "https://scheduler-d7bc6.firebaseio.com",
  projectId: "scheduler-d7bc6",
  storageBucket: "",
  messagingSenderId: "930042468500",
  appId: "1:930042468500:web:6b6e606d36440dc995bc81"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const buttonColor = selected => (
  selected ? 'success' : null
)

const saveCourse = (course, meets) => {
  db.child('courses').child(course.id).update({meets})
    .catch(error => alert(error));
};

const moveCourse = course => {
  const meets = prompt('Enter new meeting data, in this format:', course.meets);
  if (!meets) return;
  const {days} = timeParts(meets);
  if (days) saveCourse(course, meets);
  else moveCourse(course);
};

const Course = ({ course, state, user }) => (
    <Button color={ buttonColor(state.selected.includes(course)) }
      onClick={ () => state.toggle(course) }
      onDoubleClick={ user ? () => moveCourse(course) : null }
      disabled={ hasConflict(course, state.selected) }
      >
      { getCourseTerm(course) } CS { getCourseNumber(course) }: { course.title }
    </Button>
);


export { Course, buttonColor , db };
