import * as React from "react";
import * as _ from "lodash";

const Popover = require('react-bootstrap/lib/Popover');
const ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
const Button = require('react-bootstrap/lib/Button');
const OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
const Panel = require('react-bootstrap/lib/Panel');
const bootstrapUtils = require("react-bootstrap/lib/utils/bootstrapUtils");
const ListGroup = require("react-bootstrap/lib/ListGroup");
const ListGroupItem = require("react-bootstrap/lib/ListGroupItem");
bootstrapUtils.addStyle(Button, 'overlay');
const ButtonGroup = require("react-bootstrap/lib/ButtonGroup");

export const MovieHitsGridItem = (props)=> {
  const {bemBlocks, result} = props
  let url = "https://photo.mir24.tv/" + result._source.imdbId+ "/" + result._source.plot
  const source:any = _.extend({}, result._source, result.highlight)

  const popoverHoverFocus = (

    <Popover id="popover-trigger-hover-focuse" title="Meta Data" className="bt3-no-border">
      <ListGroup>
        <ListGroupItem  header="Author" href="#">{source.author}</ListGroupItem>
      </ListGroup>
    </Popover>

  )

  const metaDataOverlay = (
  <div>
  <style type="text/css">{`
  .btn-overlay {
    background-color: white;
    margin-right: -15px;
    margin-left: -15px;
    padding-bottom: -20px;
    padding: 0;
  }
  `}</style>

      <ButtonToolbar>
        <ButtonGroup>
        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverHoverFocus}>
          <Button bsStyle="overlay">
            <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
              <a href={url} onClick={(e)=>{e.preventDefault(); console.log("195.26.178.77/plugins/imageviewer/site/direct.php?s="+result._source.imdbId)}}>
                <div>
                  <img data-qa="poster" className={bemBlocks.item("poster")} src={result._source.poster} width="240" height="240"/>
                </div>
              </a>
            </div>
          </Button>
        </OverlayTrigger>
        </ButtonGroup>
      </ButtonToolbar>

    </div>
  )

  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
        {metaDataOverlay}
        <div className="div-title" dangerouslySetInnerHTML={{__html:source.title}}></div>
    </div>
  )
}

export const MovieHitsListItem = (props)=> {
  const {bemBlocks, result} = props
  let url = "http://www.imdb.com/title/" + result._source.imdbId
  const source:any = _.extend({}, result._source, result.highlight)

  const popoverHoverFocus = (

    <Popover id="popover-trigger-hover-focus" title="Meta Data" className="bt3-no-border">
      <ListGroup>
        <ListGroupItem  header="Author" href="#">{source.author}</ListGroupItem>
      </ListGroup>
    </Popover>

  )

  const metaDataOverlay = (
  <div>
  <style type="text/css">{`
  .btn-overlay {
    background-color: white;
    margin-right: -15px;
    margin-left: -15px;
  }
  `}</style>

      <ButtonToolbar>
        <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popoverHoverFocus}>
          <Button bsStyle="overlay">
            <div className={bemBlocks.item("poster")}>
              <img data-qa="poster" src={result._source.poster}/>
            </div>
          </Button>
        </OverlayTrigger>
      </ButtonToolbar>

    </div>
  )

  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      {metaDataOverlay}
      <div className={bemBlocks.item("details")}>
        <a href={url} target="_blank"><h2 className={bemBlocks.item("title")} dangerouslySetInnerHTML={{__html:source.title}}></h2></a>
        <h3 className={bemBlocks.item("subtitle")}>Released in {source.year}, rated {source.imdbRating}/10</h3>
        <div className={bemBlocks.item("text")} dangerouslySetInnerHTML={{__html:source.plot}}></div>
      </div>
    </div>
  )
}
