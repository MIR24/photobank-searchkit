import * as React from "react";

export var deletedFilesIds = {};

class ImageBox extends React.Component<any, any> {
    __isMounted = null;
  
    constructor(props) {
        super(props);

        var markedForDeleting = false;
        var inDeleteQuery = false;

        Object.keys(deletedFilesIds).forEach((key) => {
            if (key == this.props.result._id) {
                if (deletedFilesIds[key].check) {
                    markedForDeleting = true;
                }
                inDeleteQuery = true;
            }
        });

        this.state = {
            markedForDeleting: markedForDeleting,
            inDeleteQuery: inDeleteQuery,
        };
    }
  
    componentDidMount() { 
        this.__isMounted = true;
    }
    
    componentWillUnmount() {
       this.__isMounted = false;
    }
  
    deleteFile = () => {
        this.setState({
            inDeleteQuery: true,
        });
        deletedFilesIds[this.props.result._id] = {
            check: false,
            action: this.deleteStateChange,
        };
    }
  
    removeFromDeleteFileQuery = () => {
        delete deletedFilesIds[this.props.result._id];
        this.setState({
            markedForDeleting: false,
            inDeleteQuery: false,
        })
    }
  
    deleteStateChange = () => {
        if (this.__isMounted) {
            this.setState({
                markedForDeleting: true,
            });
        }
    }
  
    render () {
        return (
        <div className={this.props.bemBlocks.item().mix(this.props.bemBlocks.container("item"))} data-qa="hit" title={this.props.source.description}>
            <a href={this.props.url} target="_blank">
            <div >
                <div className="container">
                    <div className="image-container">
                    <img data-qa="poster" className={this.props.bemBlocks.item("poster")} src={this.props.result._source.poster}/>
                    <div className="image-info">{this.props.imgInfo}</div>
                    <div className="image-info">{this.props.result._source.date_taken}</div>
                    </div>
                </div>
                {
                    this.state.markedForDeleting
                    ? <div className="image-deleted-overlay">В очереди на удаление</div>
                    : this.state.inDeleteQuery
                    ? <div
                        title="Убрать"
                        className="image-delete"
                        dangerouslySetInnerHTML={{__html:"&#10004;"}}
                        onClick={(e)=>{ e.preventDefault(); this.removeFromDeleteFileQuery() }}
                        ></div>
                    : <div
                        title="Удалить"
                        className="image-delete"
                        dangerouslySetInnerHTML={{__html:"&#10005;"}}
                        onClick={(e)=>{ e.preventDefault(); this.deleteFile() }}
                        ></div>
                }
                <div data-qa="title" className="div-title" dangerouslySetInnerHTML={{__html:this.props.source.keywords}}></div>
            </div>
            </a>
        </div>
        )
    }
}

export default ImageBox;