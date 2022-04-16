import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import axios from 'axios'

// const BASE_URL = ""

const SET_COMMENT = 'SET_COMMENT'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'
const UPDATE_COMMENT = 'UPDATE_COMMENT'
