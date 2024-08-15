class View {
    constructor() {}
  
    createElement(elementTag, elementClass) {
      const element = document.createElement(elementTag);
      if (elementClass) {
        element.classList.add(elementClass);
      }
      return element;
    }
  
    createRepoElement(repoData) {
      const repoElement = this.createElement("div", "card__repoElement");
      const repoName = this.createElement("p");
      const repoOwner = this.createElement("p");
      const repoStars = this.createElement("p");
      repoName.textContent = `Name: ${repoData.full_name}`;
      repoOwner.textContent = `Owner: ${repoData.owner.login}`;
      repoStars.textContent = `Stars: ${repoData.score}`;
      repoElement.append(repoName);
      repoElement.append(repoOwner);
      repoElement.append(repoStars);
      this.searchList.append(repoElement);
    }
  }
  
  new View
  
  const autocompList = document.querySelector(".card__autocompList");
  const searchInput = document.querySelector("card__input");
  
  searchInput.addEventListener(
    "keyup",
    // debounce(this.searchRepositories.bind(this), 400)
    debounce((event) => {
      let userInput = event.target.value;
      let emptyArray = [];
      if (userInput) {
        emptyArray = options.filter((data) => {
          return data
            .toLocaleLowerCase()
            .startsWith(userInput.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data) => {
          return (data = `<li class="card__option">${data}</li>`);
        });
        console.log(emptyArray);
      } else {
      }
      showOptions(emptyArray);
      searchInput.classList.add("active");
    }, 400)
  );
  
  async function searchRepositories() {
    return await fetch(
      `https://api.github.com/search/repositories?q=${this.view.searchInput.value}`
    ).then((response) => {
      if (response.ok) {
        response.json().then((result) => {
          result.items.forEach((repo) => this.view.createRepoElement(repo));
        });
      } else {
        console.log(response.status, response.statusText);
      }
    });
  }
  
  //showOptions
  function showOptions(list) {
    let listData;
    if (!list.length) {
    } else {
      listData = list.join("");
    }
    autocompList.insertAdjacentHTML("beforeend", listData);
  }
  
  //options
  let options = ["One", "Two", "Three", "Four", "Five"];
  
  //debounce
  function debounce(fn, debounceTime) {
    let timeout;
    return function () {
      const fnCall = () => {
        fn.apply(this, arguments);
      };
  
      clearTimeout(timeout);
  
      timeout = setTimeout(fnCall, debounceTime);
    };
  }
  

//--------------------------------------------------------------------------------

/*
      <input type="text" class="card__input" placeholder="Поиск">
      <div class="card__autocompList"></div>
      <section class="card__searchList"></section>
*/
  