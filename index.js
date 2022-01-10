// User object
function User (name, lastName, password, email, age) {
	this.name = name;
	this.lastName = lastName;
	this.password = password;
	this.email = email;
	this.age = age;
}

// User create new user
function createNewUser()
{
	user = new User(prompt("Write your name"), prompt("Write your lastname"), prompt("Write your password"), prompt("Write your email"), prompt("Write your age"))
	
	Object.keys(user).forEach(row => 
	{
		while (!user[row]) {
			user[row] = prompt(`Please write your ${row}`);
		}
	})
	
	let users = JSON.parse(localStorage.getItem("users")) || [];
	users.push(user);
	
	localStorage.setItem("users", JSON.stringify(users, undefined, 1));
	
	if (confirm("Create new user?")) 
	{
		createNewUser();
	}
	else 
	{
		alert("User is created, Click ok for login");
		login(users);
	}
}
createNewUser();

// User login
function login(users)
{
	let thisuser = undefined;
	user = new User(prompt("Write your name"), undefined, prompt("Write your password"), undefined, undefined);

	users.forEach(row => 
	{
		Object.keys(row).forEach(rownames => 
		{
			if (row["name"] == user["name"] && row["password"] == user["password"]) 
			{
				thisuser = row;
			}
		})
	});
	console.log(thisuser)
	if (thisuser)
	{
		document.write(`<ul class="list-group">`)
  			document.write(`<li class="list-group-item list-group-item-action active">Name: ${thisuser['name']}</li>`)
  			document.write(`<li class="list-group-item list-group-item-danger">LastName: ${thisuser['lastName']}</li>`)
  			document.write(`<li class="list-group-item list-group-item-warning">Email: ${thisuser['email']}</li>`)
  			document.write(`<li class="list-group-item list-group-item-light">Age: ${thisuser['age']}</li>`)
		document.write(`</ul>`)
	}
	else 
	{
		tryagain = confirm("Try again?");
		if (tryagain)
			login(users);			
		else 
			createNewUser();
	}
}