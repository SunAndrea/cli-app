const { Command } = require("commander");

const {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const program = new Command();

let contacts;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "getListContacts":
      contacts = await getListContacts();
      console.log(contacts);
      break;

    case "getContactById":
      const contact = await getContactById(id);
      console.log(contact);
      break;

    case "removeContact":
      await removeContact(id);
      contacts = await getListContacts();
      console.log(contacts);
      break;

    case "addContact":
      await addContact(name, email, phone);
      contacts = await getListContacts();
      console.log(contacts);

      break;

    default:
      console.log("No such action!");
      break;
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

invokeAction(program.opts());
