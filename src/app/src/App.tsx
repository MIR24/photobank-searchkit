import * as React from "react";
import * as _ from "lodash";
const BEMBlock = require("bem-cn")

import {
  SearchBox,
  Hits,
  HitsStats,
  RefinementListFilter,
  Pagination,
  ResetFilters,
  MenuFilter,
  SelectedFilters,
  Toggle,
  HierarchicalMenuFilter,
  NumericRefinementListFilter,
  PageSizeSelector,
  SortingSelector,
  SearchkitComponent,
  SearchkitProvider,
  SearchkitManager,
  NoHits,
  RangeFilter,
  InitialLoader,
  ViewSwitcherToggle,
  ViewSwitcherHits,
  Layout, LayoutBody, LayoutResults,
  SideBar, TopBar,
  ActionBar, ActionBarRow
} from "searchkit";

import "searchkit/theming/theme.scss";
import "./../styles/customisations.scss";

import {MovieHitsGridItem, MovieHitsListItem} from "./ResultComponents"
import {multiSelectList} from "./ResultComponents"

let thisSearchkit ;


const NoHitsDisplay = (props) => {
  const {bemBlocks, query, suggestion, noResultsLabel, resetFilters} = props
  let divsToAdd = [];
  if(!suggestion){
    divsToAdd.push(React.createElement("div", {className: bemBlocks.container("info"), key: 9 },
                      "Ничего не найдено для",
                      React.createElement("span", {className: bemBlocks.container("em"), key: 1}, " "+query+".")),
                      React.createElement("div", {className: bemBlocks.container("steps"), key: 8},
                                      React.createElement("div", {className: bemBlocks.container("step-action"),
                                                          onClick: ()=>{thisSearchkit.getQueryAccessor().resetState(); thisSearchkit.performSearch(true);} },
                                                          "Сбросить поиск" )))
  }
  else{

    divsToAdd.push(React.createElement("div", {className: bemBlocks.container("info"), key: 10 },
                      "Ничего не найдено для",
                      React.createElement("span", {className: bemBlocks.container("em"), key: 1}, " "+query+"."),
                      React.createElement("span", {className: bemBlocks.container(), key: 2}, " Искать:")))

    for(let i=0; i<thisSearchkit.results.suggest.suggestions[0].options.length; i++){
      divsToAdd.push(React.createElement("div", {className: bemBlocks.container("steps"), key: i},
                      React.createElement("div", {className: bemBlocks.container("step-action"),
                                          onClick: (e)=>{e.preventDefault();  thisSearchkit.getQueryAccessor().setQueryString(thisSearchkit.results.suggest.suggestions[0].options[i].text, true); thisSearchkit.performSearch(true);} },
                                          thisSearchkit.results.suggest.suggestions[0].options[i].text )))
    }
  }
  return (
    <div data-qa="no-hits" className={bemBlocks.container()}>
        {divsToAdd}
    </div>
  );
}

export class App extends React.Component<any, any> {

  searchkit:SearchkitManager

  constructor() {
    super()
    const host = "https://elastic.mir24.tv/movies"
    this.searchkit = new SearchkitManager(host)
    thisSearchkit = this.searchkit

    this.searchkit.setQueryProcessor((plainQueryObject)=>{
      let text = this.searchkit.query.getQueryString();
      let suggestions = {"phrase":{"field":"title","real_word_error_likelihood":0.95,"max_errors":1,"gram_size":4,"direct_generator":[{"field":"_all","suggest_mode":"always","min_word_length":1}]}};
      plainQueryObject.suggest = {suggestions};
      plainQueryObject.suggest.text = text;
      return plainQueryObject
    })

    this.searchkit.translateFunction = (key)=> {
      return {
        "pagination.next":"Следующая",
        "pagination.previous":"Предыдущая",
        "searchbox.placeholder":"Поиск...",
        "hitstats.results_found":"{hitCount} найдено",
        "facets.view_more":"Показать больше",
        "facets.view_all":"Показать все",
        "facets.view_less":"Показать меньше",
        "NoHits.DidYouMean":"Искать {suggestion}",
        "NoHits.NoResultsFound":"Ничего не найдено для {query}.",
        "NoHits.NoResultsFoundDidYouMean":"Ничего не найдено для {query}. Может быть {suggestion}?",
        "NoHits.SearchWithoutFilters":"Искать {query} без фильтров"
      }[key]
    }
  }


  render(){

    return (
      <SearchkitProvider searchkit={this.searchkit}>
        <Layout>
          <TopBar>
            <div className="my-logo">МИР24 фотобанк</div>
            <SearchBox
              translations={{"searchbox.placeholder":"type at least 3 characters for image search"}}
              queryOptions={{"minimum_should_match":"70%"}}
              autofocus={true}
              searchOnChange={true}
              queryFields={["actors^1","type^2","languages","title^5", "genres^2", "plot", "author", "short_url", "original_filename"]}/>
          </TopBar>

          <LayoutBody>

      			<SideBar>
      				<HierarchicalMenuFilter fields={["type.raw", "genres.raw"]} title="Categories" id="categories"/>
              <RangeFilter min={0} max={100} field="metaScore" id="metascore" title="Metascore" showHistogram={true}/>
              <RangeFilter min={1000} max={3000} field="exifimagelength" id="exifimagelength" title="Высота изображения" showHistogram={true}/>
              <RangeFilter min={1000} max={3000} field="exifimagewidth" id="exifimagewidth" title="Ширина изображения" showHistogram={true}/>
              <NumericRefinementListFilter id="alignment" title="Вертикальные/Горизонтальные" field="horizontal" options={[
                {title:"Все"},
                {title:"Вертикальные", from:0, to:1},
                {title:"Горизонтальные", from:1, to:2}
              ]}/>
              <NumericRefinementListFilter id="smallBig" title="Маленькие/Большие" field="sizetype" options={[
                {title:"Все"},
                {title:"Маленькие, до 1500px", from:0, to:1500},
                {title:"Большие, свыше 1500px", from:1500, to:9000}
              ]}/>
              <RefinementListFilter operator="OR" id="author" title="Автор" field="author.raw" size={10}/>
      				<RefinementListFilter translations={{"facets.view_more":"View more writers"}} id="writers" title="Writers" field="writers.raw" operator="OR" size={10}/>
      				<RefinementListFilter id="countries" title="Countries" field="countries.raw" operator="OR" size={10}/>
              <NumericRefinementListFilter id="runtimeMinutes" title="Length" field="runtimeMinutes" options={[
                {title:"All"},
                {title:"up to 20", from:0, to:20},
                {title:"21 to 60", from:21, to:60},
                {title:"60 or more", from:61, to:1000}
              ]}/>
            </SideBar>

      			<LayoutResults>

              <ActionBar>

                <ActionBarRow>
          				<HitsStats translations={{
                    "hitstats.results_found":"{hitCount} results found"
                  }}/>

                  {
                    window['multiSelectFlag']
                    ? <label className="multi-select-btn" onClick={(e)=>{ window['cb'](multiSelectList) }}>Вставить</label>
                    : null
                  }

                  <SortingSelector  options={[
                    {label:"Без сортировки", defaultOption:true},
                    {label:"Сначала - новые", field:"date_taken", order:"desc"}
                  ]}/>
		  <PageSizeSelector options={[25,50,100]} listComponent={Toggle}/>
			  <ViewSwitcherToggle/>
                </ActionBarRow>
                <ActionBarRow>
                  <SelectedFilters/>
                  <ResetFilters/>
                </ActionBarRow>

              </ActionBar>

              <ViewSwitcherHits
      				    hitsPerPage={50} highlightFields={["title","plot"]}
                  sourceFilter={["plot", "title", "poster", "imdbId", "imdbRating", "year", "author","source","sourceUrl","short_url", "original_filename", "exifimagelength", "exifimagewidth", "date_taken"]}
                  hitComponents = {[
                    {key:"grid", title:"Плитка", itemComponent:MovieHitsGridItem, defaultOption:true},
                    {key:"list", title:"Список", itemComponent:MovieHitsListItem}
                  ]}
                  scrollTo="body"
              />

              <NoHits component={NoHitsDisplay} suggestionsField={"title"}/>
              <InitialLoader/>
      				<Pagination showNumbers={true}/>
      			</LayoutResults>
          </LayoutBody>
    			<a className="view-src-link" href="https://github.com/searchkit/searchkit-demo/blob/master/src/app/src/App.tsx">View source »</a>
    		</Layout>
      </SearchkitProvider>
	)}

}
