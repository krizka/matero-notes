/**
 * Created by kriz on 11/01/16.
 */

NavChapter = React.createClass({
    propTypes: {
        chapter: React.PropTypes.object.isRequired
    },

    removeChapter () {
        Chapters.remove(this.props.chapter._id);
    },

    setAsCurrent () {
        Session.set('currentChapter', this.props.chapter._id);
    },

    render () {
        return (
            <li><a onClick={this.setAsCurrent}>{this.props.chapter.title}</a>
                <a onClick={this.removeChapter}><i className="fa fa-times" /></a>
            </li>
        );
    }
});

Section = React.createClass({
    propTypes: {
        section: React.PropTypes.object.isRequired
    },

    mixins: [ReactMeteorData],

    getMeteorData () {
        return {
            chapters: Chapters.find({ section: this.props.section._id }).fetch()
        }
    },

    updateTitle (title) {
        Sections.update(this.props.section._id, {
            $set: { title: title }
        });
    },

    removeSection () {
        Sections.remove(this.props.section._id);
    },

    addChapter () {
        Chapters.insert({
            title: 'Глава',
            section: this.props.section._id,
            partition: this.props.section.partition
        })
    },

    renderNavChapters () {
        return this.data.chapters.map(chapter => {
            return <NavChapter key={chapter._id} chapter={chapter}/>;
        });
    },

    render() {
        return (
            <section className="aside_section">
                <h4 className="section_title">

                    <ContentEditable onUpdate={this.updateTitle}>{this.props.section.title}</ContentEditable>
                    <button onClick={this.removeSection} className="button button-caution button-square button-tiny">
                        <i className="fa fa-times"/>
                    </button>
                </h4>
                <ul>
                    {this.renderNavChapters()}
                </ul>
                <a onClick={this.addChapter} href="#" className="button button-action button-tiny">Добавить главу</a>
            </section>
        );
    }
});