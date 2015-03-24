/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014, Groupon, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import Flummox from 'flummox';
import AppActions from './actions/Actions.jsx';
import RecentProjectsStore from './stores/RecentProjectsStore.jsx';
import JobStore from './stores/JobStore.jsx';
 export default class Flux extends Flummox {
    constructor() {
        super();
        this.createActions('app', AppActions);
        this.createStore('recentProjects', RecentProjectsStore, this);
        this.createStore('job', JobStore, this);
    }
    getRecentProjectsFromServer(){
    const actions = this.getActions('app');
    actions.getRecentProjectsFromServer();
    }
    addBranchTab(tabRegex){
    const actions = this.getActions('app');
    actions.addBranchTab(tabRegex);
    }

}
