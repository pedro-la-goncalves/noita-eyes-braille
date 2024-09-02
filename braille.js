import MESSAGES from './messages.json' with { type: "json" }

export default class Braille {

    createCharacter(character) {
        const characterElement = document.createElement('div')
        characterElement.classList.add("braille-character")
        
        character.forEach(dot => {
            const dotElement = document.createElement('div')
            dotElement.classList.add("braille-character__dot")
            if (dot) dotElement.classList.add("braille-character__dot--active")
            
            characterElement.appendChild(dotElement)
        });

        document.querySelector('.braille-message').appendChild(characterElement)
    }

    createMessage(message) {
        message.forEach(line => line.forEach(trigram => this.createCharacter(trigram)))
    }

}