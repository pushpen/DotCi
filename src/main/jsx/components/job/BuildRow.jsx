
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

import React from 'react';
import Avatar from '../lib/Avatar.jsx';
import BuildIcon from './BuildIcon.jsx';
import BuildCauseIcon from './BuildCauseIcon.jsx';
import PageLink from './../lib/PageLink.jsx';
require('./build_row.css');
require('./build_row_small.css');
export default React.createClass({
  render(){
    return this.props.tiny? this._renderTiny(): this._renderLarge();
  },
  _renderTiny(){
    const build = this.props.build;
    return <span >
      <paper-tooltip position="right" for={'id'+build.id}>{build.number}<br/>{build.commit.message}</paper-tooltip>
      <a  className={"build-row-small "+build.result} id={'id'+build.id} href={rootURL+"/"+build.url}>
        <BuildIcon result={build.result} />
      </a>
    </span>;
  },
  _renderLarge(){
    let {result,number, cancelUrl,commit,durationString,displayTime,cause, duration} = this.props.build;
    let {message,commitUrl,shortSha,committerName,branch, avatarUrl} = commit;
    return (
      <div className="build-row">
        <div className ={"build-info build-info-"+result}>
          {this._statusRow(result,cause)}
          <span>
            <div className="build-row--title"><small>{branch}</small>
              <PageLink disabled={this._isDisabled()} href={this._buildUrl()}>{message}</PageLink>
            </div>
            <div className="build-row--committer">
              <Avatar avatarUrl={avatarUrl} />
              <span>{committerName}</span>
            </div>
            <div className="build-row--cause">{cause['shortDescription']}</div>
          </span>
          <span>
            <div>#<PageLink className="build-row--number" href={this._buildUrl()} disabled={this._isDisabled()}>{number}{result.toLowerCase()}</PageLink></div>
            {this._sha(commitUrl, shortSha)}
          </span>
          <span>
            <div>
              <iron-icon icon="alarm" />
              <span className="detail">{durationString}</span>
            </div>
            <div>
              <iron-icon icon="dotci:calendar" />
              <span className="detail">{displayTime}</span>
            </div>
          </span>
        </div>
      </div>
    );
  },
  _statusRow(result, cause){
    return this.props.compact? <span/>:<span>
      <BuildIcon result={result} />
      <BuildCauseIcon cause={cause['name']} />
    </span>
  },
  _isDisabled() {
    return this.props.build.result === "QUEUED";
  },
  _sha(commitUrl, shortSha) {
    let child = <a className="github-link link-no-decoration" href={commitUrl}><iron-icon icon="github:octoface"/>{shortSha}</a>
    if (this._isDisabled()) {
      child = <span className="github-link link-no-decoration" href={commitUrl}><iron-icon icon="github:octoface"/>{shortSha}</span>
    }
    return <div>{child}</div>
  },
  _buildUrl(){
    return this.props.fullUrl? this.props.build.url: "/"+this.props.build.number;
  }
});
