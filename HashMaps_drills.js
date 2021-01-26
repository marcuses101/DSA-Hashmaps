const { HashMap } = require("./HashMap");
const { SeperateHashMap } = require("./SeperateHashMap");

SeperateHashMap.MAX_LOAD_RATIO = 0.5;
SeperateHashMap.SIZE_RATIO = 3;
HashMap.MAX_LOAD_RATIO = 0.5;
HashMap.SIZE_RATIO = 3;

function main() {
  const lotr = new SeperateHashMap();
  lotr.set("Hobbit", "Bilbo");
  lotr.set("Hobbit", "Frodo");
  lotr.set("Wizard", "Gandalf");
  lotr.set("Human", "Aragorn");
  lotr.set("Elf", "Legolas");
  lotr.set("Maiar", "The Necromancer");
  lotr.set("Maiar", "Sauron");
  lotr.set("RingBearer", "Gollum");
  lotr.set("LadyOfLight", "Galadriel");
  lotr.set("HalfElven", "Arwen");
  lotr.set("Ent", "Treebeard");
}
main();

// 2. What does it do?
// print 20 print 10;

// 3. 1) [22,88,10, ,4,15,28,17, ,31,10]
//    2) []

function removeDuplicates(string) {
  let map = new HashMap();
  let resultString = "";
  for (const char of string) {
    try {
      map.get(char);
    } catch {
      map.set(char, true);
      resultString += char;
    }
  }
  return resultString;
}

function anyPalindromes(string) {
  const numberOfEachCharacter = [...string].reduce((object, character) => {
    return object[character]
      ? { ...object, [character]: object[character] + 1 }
      : { ...object, [character]: 1 };
  }, {});
  let unpairedCharacters = 0;
  for (number of Object.values(numberOfEachCharacter)) {
    if ((number % 2)) {
      unpairedCharacters++;
      if (unpairedCharacters>1) return false;
    }
  }
  return true;
}

function countChars(string){
  const numberOfEachCharacter = [...string].reduce((object, character) => {
    return object[character]
      ? { ...object, [character]: object[character] + 1 }
      : { ...object, [character]: 1 };
  }, {});
  return numberOfEachCharacter;
}

function isAnagram(stringOne,stringTwo){
  if (stringOne.length !== stringTwo.length) return false;
  const [objOne,objTwo] = [countChars(stringOne),countChars(stringTwo)];
  for (const char in objOne){
    if (objOne[char] !== objTwo[char]) return false;
  }
  return true;
}
function groupAnagrams(array){
  const anagrams = array.reduce((object,string)=>{
    const newObject = {...object}
    let addKey = true;
     for (const key in object) {
        if (isAnagram(key,string)) {
          addKey = false;
          newObject[key] = [...newObject[key],string];
          break;
        }
     }
     if (addKey){
      newObject[string] = [string];
     }
     return newObject;
  },{})
  return Object.values(anagrams)
}

console.log(groupAnagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']))