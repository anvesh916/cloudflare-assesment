import { Router } from 'itty-router'
import { v4 as uuidv4 } from 'uuid'
const router = Router()

const getErrorResponse = error =>
    new Response(JSON.stringify(error), {
        headers: {
            'Content-Type': 'application/json',
        },
        status: 503,
    })

const getAPIResponse = data => {
    const response = new Response(data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set(
        'Access-Control-Allow-Methods',
        'GET,HEAD,POST,PUT,OPTIONS,DELETE'
    )
    response.headers.append('Vary', 'Origin')
    return response
}
/*
Return the Posts
*/
router.get('/posts', async () => {
    const data = await POSTS.list()
    const response = []
    if (data && data.keys) {
        for (const index in data.keys) {
            const payload = await POSTS.get(data.keys[index].name, {
                type: 'json',
            })
            response.push({ ...payload, id: data.keys[index].name })
        }
    }
    return getAPIResponse(JSON.stringify(response))
})

router.get('/posts/:id', async ({ params }) => {
    const { id } = params
    const data = await POSTS.get(id)
    return getAPIResponse(data)
})

router.post('/posts', async request => {
    let payload = {}
    if (request.headers.get('Content-Type') === 'application/json') {
        payload = await request.json()
    }
    await POSTS.put(uuidv4(), JSON.stringify(payload))
    return getAPIResponse(JSON.stringify(payload))
})

router.put('/posts/:id', async request => {
    let payload = {}
    const { id } = request.params
    if (request.headers.get('Content-Type') === 'application/json') {
        payload = await request.json()
    }
    const data = await POSTS.get(id, { type: 'json' })
    if (data) {
        await POSTS.put(id, JSON.stringify({ ...data, ...payload }))
    }
    return getAPIResponse('Updated Sucessfully')
})

router.delete('/posts/:id', async ({ params }) => {
    const { id } = params
    await POSTS.delete(id)
    return getAPIResponse('Deleted Sucessfully')
})

router.all('*', () => new Response('Request not found', { status: 404 }))

const handleOptions = request => {
    let headers = request.headers
    if (
        headers.get('Origin') !== null &&
        headers.get('Access-Control-Request-Method') !== null &&
        headers.get('Access-Control-Request-Headers') !== null
    ) {
        let respHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,POST,PUT,DELETE,OPTIONS',
            'Access-Control-Max-Age': '86400',
            'Access-Control-Allow-Headers': request.headers.get(
                'Access-Control-Request-Headers'
            ),
        }
        return new Response(null, {
            headers: respHeaders,
        })
    } else {
        // Handle standard OPTIONS request.
        // If you want to allow other HTTP Methods, you can do that here.
        return new Response(null, {
            headers: {
                Allow: 'GET, HEAD, POST, OPTIONS, PUT',
            },
        })
    }
}

addEventListener('fetch', e => {
    if (e.request.method === 'OPTIONS') {
        e.respondWith(handleOptions(e.request))
    } else {
        e.respondWith(router.handle(e.request))
    }
})
