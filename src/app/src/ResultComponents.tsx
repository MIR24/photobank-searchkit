import * as React from "react";
import * as _ from "lodash";

export var multiSelectList = [];

export const MovieHitsGridItem = (props)=> {
  const {bemBlocks, result} = props
  let url = "https://photo.mir24.tv/" + result._source.imdbId+ "/" + result._source.plot
  const source:any = _.extend({}, result._source, result.highlight)
  let imgInfo = source.exifimagewidth + ' x ' + source.exifimagelength;


  const MultiSelect = React.createClass({
    getInitialState() {
      var isInArray = false;
      var objToAdd = {};

      return { childVisible: isInArray };
    },

    makeObjToSend(){
      this.objToAdd = {
          id: result._id,
          source: source.source,
          sourceurl: source.sourceurl,
          date_taken: source.date_taken,
          exifimagelength: source.exifimagelength,
          exifimagewidth: source.exifimagewidth,
          imdbId: source.imdbId,
          plot: source.plot,
          poster: source.poster,
          title: source.title
      }
    },

    appendMultiSelectList(e) {

      if (!this.isInArray && !this.state.childVisible){
        this.makeObjToSend();
        multiSelectList.push(this.objToAdd);
        this.isInArray = true;
        this.setState({childVisible: !this.state.childVisible});
      }
      else
      {
        multiSelectList.map(
          function(name, index){
            if(name.id == result._id){
              multiSelectList.splice(index,1);
            }
          })
        this.objToAdd = {};
        this.isInArray = false;
        this.setState({childVisible: !this.state.childVisible});
      }
    },

    sendOneItem() {
      this.makeObjToSend();
      multiSelectList.push(this.objToAdd);
      window['cb'](multiSelectList)
    },

    render() {

      return (
        <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
          <a href={url} onClick={(e)=>{ e.preventDefault();
                                        if(window['multiSelectFlag'] == false)
                                        { this.sendOneItem(); }
                                        else
                                        { this.appendMultiSelectList(); }
                                      }}
            >
            <div className="container">
              <div className="image-container">
                <img data-qa="poster" className={bemBlocks.item("poster")} src={result._source.poster}/>
                <div className="image-info">{imgInfo}</div>
                <div className="image-info">{result._source.date_taken}</div>
                {
                  this.state.childVisible
                  ? <div className="image-info">Selected</div>
                  : null
                }
              </div>
            </div>
          </a>
        <div data-qa="title" className="div-title" dangerouslySetInnerHTML={{__html:source.title}}></div>
        </div>
      );
    }
  });


  return (

    <MultiSelect />

  )
}

export const MovieHitsListItem = (props)=> {
  const {bemBlocks, result} = props
  let url = "http://www.imdb.com/title/" + result._source.imdbId
  const source:any = _.extend({}, result._source, result.highlight)
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <div className={bemBlocks.item("poster")}>
        <img data-qa="poster" src={result._source.poster}/>
      </div>
      <div className={bemBlocks.item("details")}>
        <a href={url} target="_blank"><h2 className={bemBlocks.item("title")} dangerouslySetInnerHTML={{__html:source.title}}></h2></a>
        <h3 className={bemBlocks.item("subtitle")}>Released in {source.year}, rated {source.imdbRating}/10</h3>
        <div className={bemBlocks.item("text")} dangerouslySetInnerHTML={{__html:source.plot}}></div>
      </div>
    </div>
  )
}
