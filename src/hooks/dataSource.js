import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks'

import {
  GET_HOMEPAGE,
  GET_APPS,
  GET_VIDEOS,
  GET_QUIZ_CATEGORIES,
  GET_QUIZZES,
} from '../resources/queries'

export function useGetHomePage(userId) {
  const { loading, error, data, refetch } = useQuery(GET_HOMEPAGE, {
    variables: { filter: { userId } },
    fetchPolicy: 'cache-and-network',
  })

  return { loading, error, data, refetch }
}

export function useGetApps({ limit, offset }) {
  const { loading, error, data, fetchMore, refetch } = useQuery(GET_APPS, {
    variables: { limit, offset },
  })

  return { loading, error, data, fetchMore, refetch }
}

export function useGetVideos({ limit, offset }) {
  const { loading, error, data, fetchMore, refetch } = useQuery(GET_VIDEOS, {
    variables: { limit, offset },
  })
  return { loading, error, data, fetchMore, refetch }
}

export function useGetQuizCategories() {
  const { loading, error, data, refetch } = useQuery(GET_QUIZ_CATEGORIES, {
    variables: { filter: { status: 1 } },
  })
  return { loading, error, data, refetch }
}

export function useGetQuizzes(categoryId, userId, status) {
  const { loading, error, data, refetch } = useQuery(GET_QUIZZES, {
    variables: { categoryId, userId, status },
  })
  return { loading, error, data, refetch }
}
