import * as React from "react";
import * as _ from "lodash";

const Button = require('react-bootstrap/lib/Button');
const Tooltip = require("react-bootstrap/lib/Tooltip");
const Overlay = require("react-bootstrap/lib/Overlay");
const bootstrapUtils = require("react-bootstrap/lib/utils/bootstrapUtils");
bootstrapUtils.addStyle(Button, 'overlay');
bootstrapUtils.addStyle(Button, 'overlay-list');
import * as ReactDOM from "react-dom";

export var list = [];


export const MovieHitsGridItem = (props)=> {
  const {bemBlocks, result} = props
  let url = "https://photo.mir24.tv/" + result._source.imdbId+ "/" + result._source.plot
  const source:any = _.extend({}, result._source, result.highlight)

  const Example = React.createClass({
    getInitialState() {
      var isInArray = false;

      list.map(
        function(name, index){
          if(name == source.poster){
            isInArray = true;
          }
        })

      return { show: isInArray };
    },

    toggle() {

      if (!this.state.show){
        list.push(source.poster);
      }
      else
      {
        list.map(
          function(name, index){
            if(name == source.poster){
              list.splice(index,1);
            }
          })
      }

      this.setState({ show: !this.state.show });
    },

    render() {
      const sharedProps = {
        show: this.state.show,
        container: this,
        target: () => ReactDOM.findDOMNode(this.refs.target)
      };

      return (
        <div style={{ position: 'relative' }}>

              <Button bsStyle="overlay" ref="target" onClick={ this.toggle }>
                <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
                  <a href={url} onClick={(e)=>{e.preventDefault(); console.log("195.26.178.77/plugins/imageviewer/site/direct.php?s="+result._source.imdbId)}}>
                  <div>
                    <img data-qa="poster" className={bemBlocks.item("poster")} src={result._source.poster} width="240" height="240"/>
                  </div>
                  </a>
                </div>
              </Button>

          <Overlay {...sharedProps} placement="top">
            <Tooltip id="overload-top">✔ Selected</Tooltip>
          </Overlay>

        </div>
      );
    }
  });

  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
        <Example />
        <div className="div-title" dangerouslySetInnerHTML={{__html:source.title}}></div>
    </div>
  )
}

export const MovieHitsListItem = (props)=> {
  const {bemBlocks, result} = props
  let url = "http://www.imdb.com/title/" + result._source.imdbId
  const source:any = _.extend({}, result._source, result.highlight)

  const Example = React.createClass({
    getInitialState() {

    var isInArray = false;

    list.map(
      function(name, index){
        if(name == source.poster){
          isInArray = true;
        }
      })

      return { show: isInArray };
    },

    toggle() {

      if (!this.state.show){
        list.push(source.poster);
      }
      else
      {
        list.map(
          function(name, index){
            if(name == source.poster){
              list.splice(index,1);
            }
          })
      }

      this.setState({ show: !this.state.show });
    },

    render() {
      const sharedProps = {
        show: this.state.show,
        container: this,
        target: () => ReactDOM.findDOMNode(this.refs.target)
      };

      return (
        <div style={{ position: 'relative' }}>

              <Button bsStyle="overlay-list" ref="target" onClick={ this.toggle }>
                <div className={bemBlocks.item("poster")}>
                  <img data-qa="poster" src={result._source.poster}/>
                </div>

              </Button>

          <Overlay {...sharedProps} placement="top">
            <Tooltip id="overload-top">✔ Selected</Tooltip>
          </Overlay>

        </div>
      );
    }
  });

  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <Example />
      <div className={bemBlocks.item("details")}>
        <a href={url} target="_blank"><h2 className={bemBlocks.item("title")} dangerouslySetInnerHTML={{__html:source.title}}></h2></a>
        <h3 className={bemBlocks.item("subtitle")}>Released in {source.year}, rated {source.imdbRating}/10</h3>
        <div className={bemBlocks.item("text")} dangerouslySetInnerHTML={{__html:source.plot}}></div>
      </div>
    </div>
  )
}
