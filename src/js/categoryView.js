import Storage from "./storage.js";

export default class CategoryView {
    constructor() {
        // variables
        this.ctgTitleInput = document.querySelector("#categoryTitle")
        this.ctgDescInput = document.querySelector("#categoryDescription")
        this.ctgCacelBtn = document.querySelector("#categoryCanelBtn")
        this.ctgAddBtn = document.querySelector("#categoryAddNewBtn")
        this.ctgSelect = document.querySelector("#categoriesSelect")
        // event listeners
        this.ctgAddBtn.addEventListener("click", () => {
            this.addNewCategory()
        })
        this.ctgCacelBtn.addEventListener("click", () => {
            this.ctgTitleInput.value = ' '
            this.ctgDescInput.value = ' '
        })
    }

    setupApp() {
        this.instantCtgUpdate(Storage.getCategories())
    }

    addNewCategory() {
        if (this.ctgTitleInput.value.trim().length >= 2) {
            // create new object for each category
            const newCategroy = {
                id: new Date().getTime(),
                title: this.ctgTitleInput.value,
                description: this.ctgDescInput.value,
            }
            // reset inputs value
            this.ctgTitleInput.value = ' '
            this.ctgDescInput.value = ' '
            // save category to local storage
            const savedCategories = Storage.getCategories();
            // edit => ... save
            // new => ... save
            const existedItem = savedCategories.find((c) => c.title === newCategroy.title);
            if (existedItem) {
                // edit
                existedItem.title = newCategroy.title;
                existedItem.description = newCategroy.description;
                alert("this category name has been added before so we will update the category description!")
                return
            } else {
                // new
                newCategroy.id = new Date().getTime();
                newCategroy.createdAt = new Date().toISOString();
                savedCategories.push(newCategroy);
            }
            console.log(savedCategories);
            Storage.saveCategories(savedCategories)
            // instant update html category list from storage
            this.instantCtgUpdate(savedCategories)
        } else {
            alert("your entered title for category must be at least 2 characters!!!")
        }
    }

    instantCtgUpdate(categories) {
        const ctgListTitles = categories.map(obj => obj.title.trim())
        console.log(categories);
        // create option for each category
        this.ctgSelect.innerHTML = ` <option selected value="none">- select category -</option>  `
        ctgListTitles.forEach(option => {
            const newOption = document.createElement("option")
            newOption.value = option;
            newOption.textContent = option;
            // append new created option to select tg
            this.ctgSelect.append(newOption)
        });
    }

}