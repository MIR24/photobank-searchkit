import * as React from "react";
import * as _ from "lodash";

export var multiSelectList = [];


class MultiSelect extends React.Component<any, any> {
  constructor(props) {
    super(props);
    var isInArray = false;

    multiSelectList.map(
      (name, index)=>{
        if(name.id == this.props.props.result._id){
          isInArray = true;
        }
      })

    this.state = {
      childVisible: isInArray,
      objToAdd: {}
    };
  }

  makeObjToSend(){
    localStorage.setItem('state', JSON.stringify(window['searchkit'].state));
    this.state.objToAdd = {
      id: this.props.props.result._id,
      source: this.props.props.result._source.source,
      sourceUrl: this.props.props.result._source.sourceurl ? this.props.props.result._source.sourceurl : this.props.props.result._source.sourceUrl,
      date_taken: this.props.props.result._source.date_taken,
      exifimagelength: this.props.props.result._source.exifimagelength,
      exifimagewidth: this.props.props.result._source.exifimagewidth,
      imdbId: this.props.props.result._source.imdbId,
      plot: this.props.props.result._source.plot,
      poster: this.props.props.result._source.poster,
      title: this.props.props.result._source.title,
      author: this.props.props.result._source.author,
      oldTitle: this.props.props.result._source.oldtitle,
      sourceText: this.props.props.result._source.sourcetext 
    };
  }

  sendOneItem(){
    this.makeObjToSend();
    multiSelectList.push(this.state.objToAdd);
    window['cb'](multiSelectList);
  }

  appendMultiSelectList(){

    if (!this.state.childVisible){
      this.makeObjToSend();
      multiSelectList.push(this.state.objToAdd);
      this.setState({ childVisible : true });
    }
    else
    {
      multiSelectList.map(
        (name, index)=>{
          if(name.id == this.props.props.result._id){
            multiSelectList.splice(index,1);
          }
        })
      this.setState({ childVisible : false });
    }

  }

  render() {
    return (
      <div className={this.props.props.bemBlocks.item().mix(this.props.props.bemBlocks.container("item"))} data-qa="hit">
        <a href={this.props.url} onClick={(e)=>{ e.preventDefault();
                                      if(window['multiSelectFlag'] == false)
                                      { this.sendOneItem(); }
                                      else
                                      { this.appendMultiSelectList(); }
                                    }}
          >
          <div className="container">
            <div className="image-container">
              <img data-qa="poster" className={this.props.props.bemBlocks.item("poster")} src={this.props.props.result._source.poster}/>
              <div className="image-info">{this.props.imgInfo}</div>
              <div className="image-info">{this.props.props.result._source.date_taken}</div>
              {
                this.state.childVisible
                ? <div className="image-selected" dangerouslySetInnerHTML={{__html:"&#10004;"}}></div>
                : null
              }
            </div>
          </div>
        </a>
      <div data-qa="title" className="div-title" dangerouslySetInnerHTML={{__html:[this.props.source.keywords, this.props.source.title, this.props.source.description].join(', ')}}></div>
      </div>
    );
  }
}

export const MovieHitsGridItem = (props)=> {
  const {bemBlocks, result} = props
  let url = "https://photo.mir24.tv/" + result._source.imdbId+ "/" + result._source.plot
  const source:any = _.extend({}, result._source, result.highlight)
  let imgInfo = source.exifimagewidth + ' x ' + source.exifimagelength;

  return (

    <MultiSelect props = {props} imgInfo = {imgInfo} url = {url} source = {source} />

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
