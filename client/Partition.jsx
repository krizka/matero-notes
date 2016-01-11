/**
 * Created by kriz on 11/01/16.
 */

Partition = React.createClass({
    propTypes: {
        partition: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            blockId: undefined,
            blockTitle: "",
            blockContent: ""
        }
    },

    mixins: [ReactMeteorData],

    getMeteorData() {
        Meteor.subscribe('partitionContent', this.props.partition._id);
        var chapterId = Session.get('currentChapter');
        return {
            chapter: Chapters.findOne(chapterId),
            sections: Sections.find().fetch()
        };
    },

    updateTitle (title) {
        Partitions.update(this.props.partition._id, {
            $set: { title: title }
        });
    },

    updateChapterTitle (title) {
        Chapters.update(this.data.chapter._id, {
            $set: { title: title }
        });
    },

    addSection () {
        Sections.insert({
            title: 'Секция',
            partition: this.props.partition._id
        });
    },

    editBlock (block) {
        this.setState({
            blockId: block._id,
            blockTitle: block.title,
            blockContent: block.content
        })
    },

    submitBlock (event) {
        event.preventDefault();

        const block = {
            title: this.refs.title.value,
            content: this.refs.content.value
        };

        if (this.state.blockId) { // edit current block
            block._id = this.state.blockId;
            Chapters.update(
                { _id: this.data.chapter._id, 'blocks._id': this.state.blockId },
                { $set: { 'blocks.$': block } }
            );
        } else {
            block._id = Random.id();
            Chapters.update(this.data.chapter._id, { $push: {
                blocks: block
            }});
        }

        this.setState(this.getDefaultState());
    },

    renderChapterBlocks () {
        if (!this.data.chapter.blocks)
            return;

        return this.data.chapter.blocks.map(block =>
            <ChapterBlock onEdit={this.editBlock} key={block._id} block={block} chapterId={this.data.chapter._id}/>
        );
    },

    renderChapter () {
        return (<div>
            <ContentEditable onUpdate={this.updateChapterTitle}>{this.data.chapter.title}</ContentEditable>
            {this.renderChapterBlocks()}
            <form onSubmit={this.submitBlock} id="add-block-form" action="">
                <div className="add_item">
                    <input type="text" name="title" placeholder="Заголовок нового блока" ref="title" defaultValue={this.state.blockTitle} required/>
                    <textarea name="content" id="" cols="30" rows="10" placeholder="Текст нового блока" ref="content" defaultValue={this.state.blockContent} required/>
                    <input type="submit" value="Добавить" className="button button-action button-tiny"/>
                </div>
            </form>
        </div>);
    },

    renderSections () {
        return this.data.sections.map(section =>
            <Section key={section._id} section={section}/>
        );
    },

    render() {
        return (<div>
            <div className="grid-spaceBetween">
                <h1><ContentEditable onUpdate={this.updateTitle}>{this.props.partition.title}</ContentEditable></h1>
                <aside className="col-3">
                    {this.renderSections()}
                    <a onClick={this.addSection} className="button button-primary button-pill button-small">Добавить секцию</a>
                </aside>
                <div className="col-8">
                    {this.data.chapter && this.renderChapter()}
                </div>
            </div>
        </div>);
    }
});