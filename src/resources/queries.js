import { gql } from 'apollo-boost'

export const GET_HOMEPAGE = gql`
  query GetHomePage($filter: JSON!) {
    apps: apps {
      id
      thumbnail
      id
      shortDescription
      name
    }
    carousel: homes {
      banners {
        thumbnail
        intent
        quizId
        bannerType
      }
      carouselInterval
    }
    score: findScores(filter: $filter) {
      score
    }
  }
`

export const GET_APPS = gql`
  query GetApps($limit: Int, $offset: Int) {
    apps: scrollApps(limit: $limit, offset: $offset) {
      url
      id
      name
      order
      thumbnail
      description
      youtubeUrl
    }
  }
`

export const GET_VIDEOS = gql`
  query GetVideos($limit: Int, $offset: Int) {
    videos: scrollVideos(limit: $limit, offset: $offset) {
      url
      videoId
      title
    }
  }
`

export const GET_QUIZ_CATEGORIES = gql`
  query GetQuizCategories($filter: JSON!) {
    categories: findCategories(filter: $filter) {
      id
      name
      status
      thumbnail
      watermark
      order
    }
  }
`

export const GET_QUIZZES = gql`
  query GetQuizzes($userId: ID, $categoryId: ID, $status: Int) {
    journey: journey(userId: $userId, categoryId: $categoryId, status: $status)
  }
`

export const GET_QUIZ_QUESTIONS = gql`
  query GetQuizQuestions($userId: ID, $quizId: ID) {
    questions: quizQuestions(userId: $userId, quizId: $quizId)
  }
`
