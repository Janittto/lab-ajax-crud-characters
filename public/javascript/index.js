const charactersAPI = new APIHandler("http://localhost:8000");
const characterContainer = document.querySelector(".characters-container");
const templateChars = document.querySelector(".character-info");
//const checkBox = document.querySelectorAll("querySelectorAll");

// function isChecked() {
//   if ((document.querySelectorAll("querySelectorAll").checked = true)) {
//     return true;
//   } else {
//     return false;
//   }
// }

window.addEventListener("load", () => {
  document
    .getElementById("fetch-all")
    .addEventListener("click", function (event) {
      async function fetchAll() {
        const { data } = await axios.get("http://localhost:8000/characters");
        characterContainer.innerHTML = "";
        data.forEach((element) => {
          const clone = templateChars.cloneNode(true);
          clone.querySelector(".name").textContent = element.name;
          clone.querySelector(".occupation").textContent = element.occupation;
          clone.querySelector(".weapon").textContent = element.weapon;
          clone.querySelector(".cartoon").textContent = element.cartoon;
          characterContainer.append(clone);
        });
      }
      fetchAll();
    });

  document
    .getElementById("fetch-one")
    .addEventListener("click", function (event) {
      async function fetchOne() {
        const pickOneForm = document.querySelector(
          "input[name='character-id']"
        );
        const id = pickOneForm.value;
        const { data } = await axios.get(
          `http://localhost:8000/characters/${id}`
        );

        characterContainer.innerHTML = "";
        const clone = templateChars.cloneNode(true);
        clone.querySelector(".name").textContent = data.name;
        clone.querySelector(".occupation").textContent = data.occupation;
        clone.querySelector(".weapon").textContent = data.weapon;
        clone.querySelector(".cartoon").textContent = data.cartoon;
        characterContainer.append(clone);
      }
      fetchOne();
    });

  document
    .getElementById("delete-one")
    .addEventListener("click", function (event) {
      async function deleteOne() {
        const deleteOneForm = document.querySelector(
          "input[name='character-id-delete']"
        );
        const btnColor = document.querySelector(".delete button");

        const id = deleteOneForm.value;
        const url = `http://localhost:8000/characters/${id}`;
        try {
          await axios.delete(url);
          btnColor.style.backgroundColor = "green";
        } catch (error) {
          btnColor.style.backgroundColor = "red";
        }
      }
      deleteOne();
    });

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", function (event) {
      async function updateOne() {
        event.preventDefault();
        const btnColor = document.querySelector("#edit-character-form button");
        const characterId = document.querySelector(
          "#edit-character-form input[name='chr-id']"
        );
        const name = document.querySelector(
          "#edit-character-form input[name='name']"
        ).value;
        const occupation = document.querySelector(
          "#edit-character-form input[name='occupation']"
        ).value;
        const weapon = document.querySelector(
          "#edit-character-form input[name='weapon']"
        ).value;
        const cartoon = document.querySelector(
          "#edit-character-form input[type='checkbox']"
        ).checked;
        const character = {
          name: name,
          occupation: occupation,
          weapon: weapon,
          cartoon: cartoon,
        };

        const id = characterId.value;
        const url = `http://localhost:8000/characters/${id}`;
        console.log(url);

        try {
          const { data } = await axios.patch(url, character);

          await axios({
            method: "PATCH",
          });
          btnColor.style.backgroundColor = "green";
        } catch (error) {
          btnColor.style.backgroundColor = "red";
        }
      }
      updateOne();
    });

  document
    .getElementById("new-character-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const btnColor = document.querySelector("#new-character-form button");

      async function postCreate() {
        const name = document.querySelector(
          "#new-character-form input[name='name']"
        ).value;
        const occupation = document.querySelector(
          "#new-character-form input[name='occupation']"
        ).value;
        const weapon = document.querySelector(
          "#new-character-form input[name='weapon']"
        ).value;
        const cartoon = document.querySelector(
          "#new-character-form input[type='checkbox']"
        ).checked;
        const character = { name, occupation, weapon, cartoon };
        const url = "http://localhost:8000/characters";

        try {
          const newCharacter = await axios.post(url, character);
          btnColor.style.backgroundColor = "green";
        } catch (error) {
          btnColor.style.backgroundColor = "red";
        }
      }
      postCreate();
    });
});
