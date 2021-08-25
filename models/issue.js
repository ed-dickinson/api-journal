var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Issue = new Schema({
  no: Number,
  title: String,
  emoji: String,
  date: Date,
  content: String,
  published: Boolean,
  comments: [{ comment: {type: String, minLength: 1},
            name: String,
            email: String,
            date: Date }]
});

module.exports = mongoose.model('Issue', Issue );

// id: '1',
// title: 'The Abundance of Wonderment',
// emoji: '🙌',
// date: "Mar '21",
// content: "There is wonderment like a filament in my brain.<br><br>The world has no difference whether it's on or off, but once I let it turn on and the charge runs through... the world is lit up mightily to me. <br><br>Light bounces off each surface... like it was waiting for me to see it. Dormant forever until my glance set foot upon it and it woke and came charging for me. <br><br>And to think that this will happen for a million others. The same surface holding something different for each person, just waiting for that particular look, at that particular time, and it lets loose that unique reaction, formed over millenia and birthed in the space of an eye twitch.<br><br>To think how many impressions are held in each spotted shade of existence... A bird's wing, made up of as many feathers as there are reactions to those feathers. Glistening like the eyeballs that will perceive them.",
// comments: [{ comment: 'I too, feel an abundance of wonderment.',
//             name: 'Commenter1',
//             date: '1-1-1',
//           },
//           { comment: 'Me as well! I feel an abundance, I feel it!',
//             name: 'Commenter2',
//             date: '2-2-2',
//           },]
// },
