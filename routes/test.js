var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const uuid = require('uuid');

let issues = {
  1: {
    id: '1',
    title: 'The Abundance of Wonderment',
    emoji: '🙌',
    date: "Mar '21",
    content: "There is wonderment like a filament in my brain.<br><br>The world has no difference whether it's on or off, but once I let it turn on and the charge runs through... the world is lit up mightily to me. <br><br>Light bounces off each surface... like it was waiting for me to see it. Dormant forever until my glance set foot upon it and it woke and came charging for me. <br><br>And to think that this will happen for a million others. The same surface holding something different for each person, just waiting for that particular look, at that particular time, and it lets loose that unique reaction, formed over millenia and birthed in the space of an eye twitch.<br><br>To think how many impressions are held in each spotted shade of existence... A bird's wing, made up of as many feathers as there are reactions to those feathers. Glistening like the eyeballs that will perceive them.",
    comments: [{ comment: 'I too, feel an abundance of wonderment.',
                name: 'Commenter1',
                date: '1-1-1',
              },
              { comment: 'Me as well! I feel an abundance, I feel it!',
                name: 'Commenter2',
                date: '2-2-2',
              },]
  },
  2: {
    id: '2',
    title: 'Take Leave of Nothing',
    emoji: '🎒',
    date: "Jun '21",
    content: "I've never left anything behind. <br><br>Not one thing. <br><br>Everything's come with me. <br><br>Whether I remember it or not, I know it's there. <br><br>Hanging on to me like a white scar hanging on to the tanned skin above my buttcheek, or a bug I haven't seen on the back of my shoulder.<br><br>And the big things, the things that weigh on me so heavy they change how I move, how my emotions feel... like a giant great crusty shell all covered in barnacles.<br><br>It's a part of me now.<br><br>And I'd never know any different.",
    comments: [{ comment: 'Scars and barnacles, love it.',
                name: 'Commenter1',
                date: '1-1-1',
              },
              { comment: "These days, I think I've bcome the the barnacle...",
                name: 'Commenter2',
                date: '2-2-2',
              },]
  },
  3: {
    id: '3',
    title: 'Take Nothing But Leaves',
    emoji: '🍃',
    date: "Jul '21",
    content: "Take nothing, &ldquo;not even take photos.&rdquo; <br><br>I used to think that. I thought the experience was most pure if you left it exactly as you found it. Then you could be sure that whatever you got from it was original and made only of it's self. <br><br>But, I don't think that any more. Mostly because I tend to forget things, but also because any memento you take, even if it exists entirely in your head— you've still taken it from there. It didn't come from you, it came from there. So if you wanted to truly take NOTHING, you'd have to never see it, sense it, smell it, anything it really. Your mind's just a biological camera, 3D, smell-o-vision... so take what you want. Take photos, take stones, take leaves, stamp 'em in a book. Hell, take a whole tree, plant it in your garden, let that experience last forever, pass it down to your grandchildren, or your neighbour's grandchildren, anyone. Not that they'll need it– there's about a bazillion things waiting for them to take.",
    comments: [{ comment: 'mmm, gimme that smell-o-vision...',
                name: 'Commenter1',
                date: '1-1-1',
              },]
  },
  4: {
    id: '4',
    title: 'Until You Sit & Ponder What Is Not You',
    emoji: '',
    date: "Aug '21",
    content: "I feel like I am everything, until I think about how little I am. My eyeballs feel like two planets in the front of my skull, my entire existence, my entire experience channelled through them. How could I think any other way? When the world is so complete right there within me. Two times over, even.<br><br>It's only when I think about how much remains outside of them that I realise how wrong I am. I think about it and it's like they start to leak out of me. I imagine them emanating little silver waves into the air. Little shimmers that mark their evaporation right out of me. I can almost watch them go.. until I have no eyes to watch them with. My vision and my concentration go too... off into the oneness.<br><br>...and yet they're still there! And they still feel like the world perched in my skull– the whole of everything balanced on the two little curves of bone that make the base of my eye sockets.",
  },
  5: {
    id: '5',
    title: 'I Go Into the Ocean...',
    emoji: '🐚',
    date: "Aug '21",
    content: "I go into the ocean to feel the shell of my soul battered by the overwhelming cold. I feel so small and weak and shrunken in on my self that I am completely reassured of my tinyness in the face of the grandness. My impermanence in the face of the endless. My destructability in the face of that which can never be destroyed. <p>The ocean is it's perfect representative. That which holds it's strength in it's shapelessness and it's scope. I throw myself at it like a pebble at a mountain. If you even looked away from where the pebble landed, you'd never even know it had been thrown.</p><br>I like this feeling of having no control over anything beyond my body. I am at the whim of everything beyond me. The tide could suck me down, the waves could bowl me over, the cold can make me think of nothing but the cold. Total power over my body and mind.<br>I feel so reassured of my place in the face of everything.",
  },
};

let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2',
  },
};

router.get('/issues', (req, res) => {
  return res.json(Object.values(issues));
});

router.get('/issues/:issueId', (req, res) => {
  return res.json(issues[req.params.issueId]);
});

router.get('/users', (req, res) => {
  return res.send(Object.values(users));
});

router.get('/users/:userId', (req, res) => {
  return res.send(users[req.params.userId]);
});


router.get('/messages', (req, res) => {
  return res.send(Object.values(messages));
});

router.post('/messages', (req, res) => {
  const id = uuid.v4();
  const message = {
    id,
    text: req.body.text,
  };

  messages[id] = message;

  return res.send(message);
});

router.get('/messages/:messageId', (req, res) => {
  return res.send(messages[req.params.messageId]);
});

router.post('/users', (req, res) => {
  return res.send('Received a POST HTTP method');
});

router.put('/users/:userId', (req, res) => {
  return res.send(
    `PUT HTTP method on user/${req.params.userId} resource`,
  );
});

router.delete('/users/:userId', (req, res) => {
  return res.send(
    `DELETE HTTP method on user/${req.params.userId} resource`,
  );
});

// router.listen(process.env.PORT, () =>
//   console.log(`Example app listening on port ${process.env.PORT}!`),
// );

module.exports = router;
