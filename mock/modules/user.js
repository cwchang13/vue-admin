import { resolveToken } from '../utils'

const users = {
  admin: {
    id: 1,
    name: 'admin',
    avatar: '/image/avatar.jpg',
    email: 'davin0513@gmail.com',
    role: ['admin'],
  },
  editor: {
    id: 2,
    name: 'editor',
    avatar: '/image/snoopy.jpg',
    email: 'davin0513@gmail.com',
    role: ['editor'],
  },
  guest: {
    id: 3,
    name: 'guest',
    avatar: '/image/none.png',
    role: [],
  },
}
export default [
  {
    url: '/api/user',
    method: 'get',
    response: ({ headers }) => {
      const token = resolveToken(headers?.authorization)
      return {
        code: 0,
        data: {
          ...(users[token] || users.guest),
        },
      }
    },
  },
]
