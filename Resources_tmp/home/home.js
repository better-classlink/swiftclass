async function homeGen(){
   try {
       document.getElementById('baseContent').innerHTML = window.SwiftClassPage
       try {
           let jsonRequest = await fetch("Resources/news/display.json")
           let newsJSON = await jsonRequest.json()

           // let newsJSON = {"title": "example"}

           // console.log(newsJSON)

           if ('body' in newsJSON) {
               let p = document.getElementById('newsTickerText')
               p.innerHTML = newsJSON.body.join('<br>')
           }

           if ('title' in newsJSON) {
               document.getElementById('newsHeader').textContent = newsJSON.title
           }

           if (newsJSON.image) {
               let newsImage = document.createElement('img')
               newsImage.src = 'resources/news/display.png'
               newsImage.classList.add('newsImage')
               newsImage.id = 'newsImage'
               let line = document.createElement('div')
               line.classList.add('lineBreak')
               document.getElementById('newsHeader').after(line)
               document.getElementById('baseContent').appendChild(newsImage)
           }

       } catch (e) {
           console.warn("news fetch error: " + e.stack)
       }
   }catch (e){
       console.warn(e)
   }
}