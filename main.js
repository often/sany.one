addEventListener('load', async () => {
  let username = 'often'
  let endpoint = 'https://api.github.com/users/' + username
  let response = await fetch(endpoint)
  let {
    name,
    bio,
    public_repos,
    repos_url
  } = await response.json()

  document.title = name

  let h1 = document.createElement('h1')
  h1.textContent = name
  document.body.append(h1)

  let p = document.createElement('p')
  p.textContent = bio
  document.body.append(p)

  p = document.createElement('p')
  p.textContent = `repositories (${public_repos}):`
  document.body.append(p)

  response = await fetch(repos_url)
  let repositories = await response.json()

  for (let {name, description, html_url} of repositories)
  {
    p = document.createElement('p')
    let a = document.createElement('a')
    a.href = html_url
    a.target = '_blank'
    a.rel = 'noopener'
    a.textContent = name
    p.append(a)
    p.append(' - ' + description)
    document.body.append(p)
  }
})
