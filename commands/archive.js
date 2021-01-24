module.exports = (client, message, args) => {
  console.log(args);

  //message.channel.send(message.channel);
  //console.log("Client stuff is:");
  //console.log(client);
  //console.log();
  //console.log("Message stuff is:");
  //console.log(message);

  // ID of "Text Channel" cateogy - use of initial parentID for finding all channels in category
  // textArchives = client.channels.cache.find(c => c.name == "Text Channels" && c.type == "category").id;

  // Collection of all channels in the "Text Channels" category
  //allChans = client.channels.cache.find(c => c.name == "Text Channels" && c.type == "category").children;

  // ID of "Archive" category - use as parentID
  catArchive = client.channels.cache.find(
    (c) => c.name == "Archive" && c.type == "category"
  ).id;

  // Move channel !ping was called in to "Archive" category
  message.channel.setParent(catArchive);

  // Add text to channel name to differentiate new vs old channels
  message.channel.setName(args[0] + message.channel.name);
};
