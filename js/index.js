const searchContainer = document.querySelector(".search-container");
const searchInput = document.querySelector(".search-input");
const searchOptions = document.querySelector(".search-options");
const searchOutput = document.querySelector(".search-output");

//  DEBOUNCE

const debounce = (fn, ms) => {
  let timer;
  function newFn() {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, ms);
  }
  return newFn;
};

// Запрос на сервер

async function getRepositories(input) {
  const responseData = await fetch(
    `https://api.github.com/search/repositories?q=${input}`
  );
  if (responseData.ok) {
    const responseRepositories = await responseData.json();
    return responseRepositories.items;
  }
}

function repositoryEvent(e) {
  if (searchInput.value == false || searchInput.value == " ") {
    searchOptions.innerHTML = "";
    return;
  }

  getRepositories(e.target.value)
    .then((repos) => {
      let userData = e.target.value;
      let suggestions = [];
      if (userData) {
        suggestions = repos.slice(0, 5);
        suggestions = suggestions.map((repo) => {
          return (repo = `<li id=${suggestions.findIndex(
            (el) => el.name === repo.name
          )}>${repo.name}</li>`);
        });
        searchContainer.classList.add("active");
      } else {
        searchContainer.classList.remove("active");
      }

      showSuggestions(suggestions);
      newArr = repos;
      searchOptions.addEventListener("click", showElem);
    })
}

function showElem(e) {
  myTarget = newArr[e.target.id];
  console.log(newArr[e.target.id])
  if (!myTarget) {
    searchInput.value = "";
    searchOptions.innerHTML = "";
    return;
  }
  const li = document.createElement("li");
  const p1 = document.createElement("p");
  p1.textContent = `Name: ${myTarget.name}`;
  const p2 = document.createElement("p");
  p2.textContent = `Owner: ${myTarget.owner.login}`;
  const p3 = document.createElement("p");
  p3.textContent = `Stars: ${myTarget.stargazers_count}`;
  const btn = document.createElement("button");
  btn.classList.add(`delete`);
  li.classList.add(`li-${myTarget.id}`);
  li.appendChild(p1);
  li.appendChild(p2);
  li.appendChild(p3);
  li.appendChild(btn);
  searchOutput.insertAdjacentElement("afterbegin", li);
  searchInput.value = "";
  searchOptions.innerHTML = "";
}

function showSuggestions(list) {
  let listData;
  if (!list.length) {
    listData = `<li>[Репозитории с таким названием не найдены]</li>`;
  } else {
    listData = list.join("");
  }
  searchOptions.innerHTML = listData;
}

let newEvent = debounce(repositoryEvent, 400);

searchInput.addEventListener("input", newEvent);

searchOutput.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.closest("li").remove();
  }
});
