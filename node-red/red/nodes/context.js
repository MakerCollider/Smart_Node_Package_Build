/**
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

var clone = require("clone");

function createContext(id) {
    var data = {};
    return {
        get: function(key) {
            return clone(data[key]);
        },
        set: function(key, value) {
            data[key] = value;
        }
    }
}

var contexts = {};
var globalContext = null;

function getContext(localId,flowId) {
    if (contexts[localId]) {
        return contexts[localId];
    }
    var newContext = createContext(localId);
    if (flowId) {
        newContext.flow = getContext(flowId);
        if (globalContext) {
            newContext.global = globalContext;
        }
    }
    contexts[localId] = newContext;
    return newContext;
}
function deleteContext(id) {
    delete contexts[id];
}

module.exports = {
    init: function(settings) {
        globalContext = createContext("global");
    },
    get: getContext,
    delete: deleteContext
};
