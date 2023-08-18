import './style.css'
import './title-bar'
import './menu-bar'
import './action-bar'
import './bottom-bar'
import './editor-area'

import {loadPref, displayLastOpenedFiles, loadLastOpened} from './local-storage'

loadPref();

loadLastOpened();
displayLastOpenedFiles();

import './actions'
import './shortcuts'

import { edit_field } from './editor-area'


edit_field.focus();