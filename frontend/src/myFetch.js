export function myFetch(query, variables={}){
    return fetch('/graphql',{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({query: query, variables: variables})
    }).then(res => res.json()).then(
      res => {
        if("errors" in res){
          alert(res.errors.map(e => e.message))
          throw new Error('Хьюстон, у нас проблемы....')
        }
        return res
      } 
    )
  }