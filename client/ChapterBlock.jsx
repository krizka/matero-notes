/**
 * Created by kriz on 11/01/16.
 */

ChapterBlock = React.createClass({
    propTypes: {
        block: React.PropTypes.object.isRequired,
        chapterId: React.PropTypes.string.isRequired,
        onEdit: React.PropTypes.func
    },

    removeBlock () {
        Chapter.update(this.props.chapterId, { $pull:  { blocks: { _id: this._id } } });
    },

    editBlock () {
        this.props.onEdit(this.props.block);
    },

    render() {
        return (<div className="item">
            <p>{this.props.block.title}</p>
            <IncludeBlaze template={Template.Markdown} data={{ content: this.props.block.content }}/>
            <button onClick={this.editBlock} className="button button-action button-square button-tiny">
                <i className="fa fa-pencil" />
            </button>
            <button onClick={this.removeBlock} className="button button-caution button-square button-tiny">
                <i className="fa fa-times" />
            </button>
        </div>);
    }
});