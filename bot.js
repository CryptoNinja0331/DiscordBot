const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const targetChannelId = '1333264692940115968'; // Replace with your channel ID
const targetTime = '23:30'; // Set the specific time (24-hour format)

client.login(process.env.TOKEN);

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Function to calculate the time difference
  const calculateDelay = () => {
    const now = new Date();
    const [hour, minute] = targetTime.split(':').map(Number);
    const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);

    if (now > target) target.setDate(target.getDate() + 1); // Schedule for the next day
    return target - now;
  };

  const scheduleMessage = () => {
    setTimeout(async () => {
      const channel = await client.channels.fetch(targetChannelId);
      if (channel) channel.send('👋 Hello, Guys. Plz set the today\'s plan. Thanks!');
      scheduleMessage(); // Schedule the next message
    }, calculateDelay());
  };

  scheduleMessage(); // Start the scheduling
});

client.login(process.env.TOKEN);
