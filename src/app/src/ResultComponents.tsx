import * as React from "react";
import * as _ from "lodash";

let regexHighlight = /<em>(.*?)<\/em>/g;

export const MovieHitsGridItem = (props)=> {
  const {bemBlocks, result} = props
  let url = "https://photo.mir24.tv/" + result._source.imdbId+ "/" + result._source.plot
  const source:any = _.extend({}, result._source, result.highlight)
  let imgInfo = source.exifimagewidth + ' x ' + source.exifimagelength;
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit" title={source.description}>
      <a href={url} target="_blank">
      <div >
           <div className="container">
            <div className="image-container">
              <img data-qa="poster" className={bemBlocks.item("poster")} src={result._source.poster}/>
              <div className="image-info">{imgInfo}</div>
              <div className="image-info">{result._source.date_taken}</div>
            </div>
           </div>
         <div data-qa="title" className="div-title" dangerouslySetInnerHTML={{__html:source.keywords}}>
         </div>
       </div>
      </a>
    </div>
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
