const GoogleSpreadsheet = require("google-spreadsheet");

const creds = require("./client_secret.json");

// Create a document object using the ID of the spreadsheet - obtained from its URL.

const doc = new GoogleSpreadsheet(
  "1j1qixqL06rANuES_tjwpXPnitBqYutsyDiX5kWap1AE"
);

// Authenticate with the Google Spreadsheets API.

doc.useServiceAccountAuth(creds, function(err) {
  // Get all of the rows from the spreadsheet.

  const roster = [];
  const mainTank = [];
  const offTank = [];
  const dd1 = [];
  const dd2 = [];
  const dd3 = [];
  const dd4 = [];
  const dd5 = [];
  const dd6 = [];
  const dd7 = [];
  const dd8 = [];
  const heal1 = [];
  const heal2 = [];

  doc.getRows(2, function(err, rows) {
    rows.map(row => {
      mainTank.push(row.maintank);
      offTank.push(row.offtank);
      dd1.push(row["dd"]);
      dd2.push(row["dd_2"]);
      dd3.push(row["dd_3"]);
      dd4.push(row["dd_4"]);
      dd5.push(row["dd_5"]);
      dd6.push(row["dd_6"]);
      dd7.push(row["dd_7"]);
      dd8.push(row["dd_8"]);
      heal1.push(row["heal"]);
      heal2.push(row["heal_2"]);
    });

    roster.push(
      mainTank,
      offTank,
      dd1,
      dd2,
      dd3,
      dd4,
      dd5,
      dd6,
      dd7,
      dd8,
      heal1,
      heal2
    );

    keysMap = { 0: "pseudo", 1: "role" };

    renameKeys = (keysMap, obj) =>
      Object.keys(obj).reduce(
        (acc, key) => ({ ...acc, ...{ [keysMap[key] || key]: obj[key] } }),
        {}
      );

    const rosterObjects = roster.map(member => {
      let memberObj = { ...member };
      return renameKeys(keysMap, memberObj);
    });

    console.table(rosterObjects);
  });
});
