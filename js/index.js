const music = document.querySelector('audio')


function play_music(){
    music.play()
    music.loop = true
    music.volume = 0.5
}

setTimeout(play_music, 1000)

