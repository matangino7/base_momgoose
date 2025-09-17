const axios = require("axios");
const jfile = require("jsonfile");
const User = require("../schemas/usersSchema"); // Make sure this path is correct

async function getUserData() {
  try {
    const usersData = (
      await axios.get("https://jsonplaceholder.typicode.com/users")
    ).data;
    return usersData;
  } catch (error) {
    console.log("Error Fetching user data: " + error.message);
    return false;
  }
}

async function getJsonData() {
  try {
    const jsonData = await jfile.readFile("./bl/persons.json");
    return jsonData;
  } catch (error) {
    console.log("Error Fetching json data: " + error.message);
    return false;
  }
}

function transformUser(rawUser) {
  return {
    externalId: rawUser.id,
    name: rawUser.name,
    email: rawUser.email,
    phone: rawUser.phone,
    address: {
      city: rawUser.address.city,
      country: "Unknown",
    },
  };
}

async function addDataToDb() {
  const userData = await getUserData();
  const jsonData = await getJsonData();
  const usersParsed = [];

  if (userData && jsonData) {
    userData.forEach((element) => {
      let user = transformUser(element);
      const phoneNum = jsonData.persons.find((x) => x.id == element.id)
        ? jsonData.persons.find((x) => x.id == element.id).phone
        : null;
      if (phoneNum) {
        user.phone = phoneNum;
      }
      usersParsed.push(user);
    });
  }

  await User.create(usersParsed);
  return usersParsed;
}

module.exports = { addDataToDb };
