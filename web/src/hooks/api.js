import { useEffect, useState } from 'react'

const CallModel = (items, image) => {
    const [editedImage, setEditedImage] = useState(null)

    const data = {
        'foundation': hexToRgb(items.foundation.shadeHex),
        'concealer': hexToRgb(items.concealer.shadeHex),
        'blush': hexToRgb(items.blush.shadeHex),
        'eyeliner': hexToRgb(items.eyeliner.shadeHex),
        'lipstick': hexToRgb(items.lipstick.shadeHex),
    }
    
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        return {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
    }

    useEffect(() => {
        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: JSON.stringify({ image })
        }).then(() => {
            fetch('/makeup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((resp) => {
                setEditedImage(resp.body)
            })
        })
    }, [image, items])

    return editedImage
}

export default CallModel