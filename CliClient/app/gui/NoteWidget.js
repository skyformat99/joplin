const Note = require('lib/models/note.js').Note;
const TextWidget = require('tkwidgets/TextWidget.js');

class NoteWidget extends TextWidget {

	constructor() {
		super();
		this.noteId_ = 0;
		this.note_ = null;
		this.notes_ = [];
		this.lastLoadedNoteId_ = null;
	}

	get notes() {
		return this.notes_;
	}

	set notes(v) {
		// If the note collection has changed it means the current note might
		// have changed or has been deleted, so refresh the note.
		this.notes_ = v;
		this.reloadNote();
	}

	get noteId() {
		return this.noteId_;
	}

	set noteId(v) {
		this.noteId_ = v;
		this.note_ = null;
		this.reloadNote();
	}

	reloadNote() {
		if (this.noteId_) {
			this.doAsync('loadNote', async () => {
				this.note_ = await Note.load(this.noteId_);
				this.text = this.note_ ? this.note_.title + "\n\n" + this.note_.body : '';
				if (this.lastLoadedNoteId_ !== this.noteId_) this.scrollTop = 0;
				this.lastLoadedNoteId_ = this.noteId_;
			});
		} else {
			this.text = '';
			this.scrollTop = 0;
		}
	}

}

module.exports = NoteWidget;