const searchGithub = () => {
    const input = document.getElementById('search-input')
    const inputText = input.value
    input.value = ''



    console.log(inputText)
    const url = `https://api.github.com/users/${inputText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayProfile(data))
}
const displayProfile = (user) => {
    const mainProfile = document.getElementById("main-profile");
    console.log(user);
    if (user.message == "Not Found") {
        mainside.innerHTML = `
        
        <h1 class="text-center mt-5" style="font-size:100px;padding:100px">Not Found</h1>

        <h3 class="text-center text-danger mt-0">Please enter a Valid Username</h3>
        `
    }

    else {

        mainProfile.innerHTML = `
    
        <div class="row">
            <div class="col-md-4">
                <div class="profile-section ps-5">
                    <img  class="rounded-circle image" src=${user.avatar_url}><br><br>
                    <h3>${user.name}</h3>
                    <p>${user.login}</p>
                    <p>${user.bio}</p>
                    <div class="d-grid gap-2 col-12 mx-auto mb-2">
                        <button class="btn border-secondary" type="button"> <i class="fas fa-cog"></i>Edit Profile</button>
                     </div>
                     <p><span><i class="fas fa-user-friends"></i> ${user.followers} followers .</span><span> ${user.following} following</span> <span><i class="far fa-star"></i></span>  </p>
                    <p><i class="fas fa-map-marker-alt"></i> ${user.location}</p>
                  
                </div>
              
            </div>
            <div class="col-md-8">
                <h3 class="text-center">Repositories</h3>
                <div class="row"  id="Totalrepository">
                    
                </div>
             

            </div>
        </div>

        `
        searchRepo(user.repos_url);
    }
}
const searchRepo = (repos) => {
    fetch(repos)
        .then(response => response.json())
        .then(repo =>
            ShowrepoDisplay(repo)
        )
}
const ShowrepoDisplay=(repos)=>{
    {
        let div= "";
        for (var i = 0; i < repos.length; i++) {
            console.log(repos[i])
            const reponame = repos[i].name;

           div+= `
            
                <div class="col-12 repo-column">
                    <div id="repository" class="repository">
                        <h5><a href="${repos[i].html_url}" target="_blank">${reponame}</a> </h5>  
                        
                        <span class="ml-0 mr-3">
                           <span class="repo-language-color" style="background-color: #4F5D95"></span>
                           <span itemprop="programmingLanguage">${repos[i].language}</span>
                           <span>  <i class="far fa-star"></i> ${repos[i].stargazers_count} </span>    <span>    <i class="fas fa-code-branch"></i> ${repos[i].forks_count}</span> 
                         </span>
                        </span>    
                   </div>   
                   <hr>
                  </div>
                        `

        }
        document.getElementById("Totalrepository").innerHTML =div;
    }
}