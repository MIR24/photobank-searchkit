import * as React from "react";

export var multiSelectList = [];
export var deletedFilesIds = {};

class ImageBox extends React.Component<any, any> {
    __isMounted = null;

    constructor(props) {
        super(props);
        var isInArray = false;
        var markedForDeleting = false;
        var inDeleteQuery = false;

        multiSelectList.map(
            (name, index) => {
                if (name.id == this.props.result._id) {
                    isInArray = true;
                }
            })

        Object.keys(deletedFilesIds).forEach((key) => {
            if (key == this.props.result._id) {
                if (deletedFilesIds[key].check) {
                    markedForDeleting = true;
                }
                inDeleteQuery = true;
            }
        });

        this.state = {
            childVisible: isInArray,
            objToAdd: {},
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

    makeObjToSend() {
        localStorage.setItem('state', JSON.stringify(window['searchkit'].state));
        this.state.objToAdd = {
            id: this.props.result._id,
            source: this.props.result._source.source,
            sourceUrl: this.props.result._source.sourceurl ? this.props.result._source.sourceurl : this.props.result._source.sourceUrl,
            date_taken: this.props.result._source.date_taken,
            exifimagelength: this.props.result._source.exifimagelength,
            exifimagewidth: this.props.result._source.exifimagewidth,
            imdbId: this.props.result._source.imdbId,
            plot: this.props.result._source.plot,
            poster: this.props.result._source.poster,
            title: this.props.result._source.title,
            author: this.props.result._source.author,
            oldTitle: this.props.result._source.oldtitle,
            sourceText: this.props.result._source.sourcetext
        };
    }

    sendOneItem() {
        this.makeObjToSend();
        multiSelectList.push(this.state.objToAdd);
        window['cb'](multiSelectList);
    }

    appendMultiSelectList() {
        if (!this.state.childVisible) {
            this.makeObjToSend();
            multiSelectList.push(this.state.objToAdd);
            this.setState({ childVisible: true });
        } else {
            this.removeFromSelectList();
        }

    }

    removeFromSelectList = () => {
        multiSelectList.map(
            (name, index) => {
                if (name.id == this.props.result._id) {
                    multiSelectList.splice(index, 1);
                }
            })
        this.setState({ childVisible: false });
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
            if (this.state.childVisible) {
                this.removeFromSelectList();
            }
            this.setState({
                markedForDeleting: true,
            });
        }
    }

    render() {
        return (
            <div className={this.props.bemBlocks.item().mix(this.props.bemBlocks.container("item"))} data-qa="hit" title={this.props.source.description}>
                <a href={this.props.url} onClick={(e) => {
                    e.preventDefault();
                    if (window['multiSelectFlag'] == false) { this.sendOneItem(); }
                    else { this.appendMultiSelectList(); }
                }}
                >
                    <div className="container">
                        <div className="image-container">
                            <img data-qa="poster" className={this.props.bemBlocks.item("poster")} src={this.props.result._source.poster} />
                            <div className="image-info">{this.props.imgInfo}</div>
                            <div className="image-info">{this.props.result._source.date_taken}</div>
                            {
                                this.state.childVisible
                                    ? <div className="image-selected" dangerouslySetInnerHTML={{ __html: "&#10004;" }}></div>
                                    : null
                            }
                        </div>
                    </div>
                </a>
                {
                    this.state.markedForDeleting
                        ? <div className="image-deleted-overlay">В очереди на удаление</div>
                        : this.state.inDeleteQuery
                            ? <div
                                title="Убрать"
                                className="image-delete"
                                dangerouslySetInnerHTML={{ __html: "&#10004;" }}
                                onClick={this.removeFromDeleteFileQuery}
                            ></div>
                            : <div
                                title="Удалить"
                                className="image-delete"
                                dangerouslySetInnerHTML={{ __html: "&#10005;" }}
                                onClick={this.deleteFile}
                            ></div>
                }
                <div data-qa="title" className="div-title" dangerouslySetInnerHTML={{ __html: this.props.source.keywords }}></div>
            </div>
        );
    }
}

export default ImageBox;