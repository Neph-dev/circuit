/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOperator = /* GraphQL */ `
  query GetOperator($id: ID!) {
    getOperator(id: $id) {
      id
      operatorName
      operatorOfficialLogo
      cityOperating
      sectors {
        items {
          id
          sectorName
          operatorID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listOperators = /* GraphQL */ `
  query ListOperators(
    $filter: ModelOperatorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOperators(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        operatorName
        operatorOfficialLogo
        cityOperating
        sectors {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSector = /* GraphQL */ `
  query GetSector($id: ID!) {
    getSector(id: $id) {
      id
      sectorName
      operatorID
      operator {
        id
        operatorName
        operatorOfficialLogo
        cityOperating
        sectors {
          nextToken
        }
        createdAt
        updatedAt
      }
      routes {
        items {
          id
          sectorID
          sectorName
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSectors = /* GraphQL */ `
  query ListSectors(
    $filter: ModelSectorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSectors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sectorName
        operatorID
        operator {
          id
          operatorName
          operatorOfficialLogo
          cityOperating
          createdAt
          updatedAt
        }
        routes {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRoute = /* GraphQL */ `
  query GetRoute($id: ID!) {
    getRoute(id: $id) {
      id
      sectorID
      sectorName
      sector {
        id
        sectorName
        operatorID
        operator {
          id
          operatorName
          operatorOfficialLogo
          cityOperating
          createdAt
          updatedAt
        }
        routes {
          nextToken
        }
        createdAt
        updatedAt
      }
      routeCheckPoints {
        items {
          id
          checkPointLatitude
          checkPointLongitude
          checkPointName
          checkPointDay
          routeID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listRoutes = /* GraphQL */ `
  query ListRoutes(
    $filter: ModelRouteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRoutes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sectorID
        sectorName
        sector {
          id
          sectorName
          operatorID
          createdAt
          updatedAt
        }
        routeCheckPoints {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRouteCheckPoint = /* GraphQL */ `
  query GetRouteCheckPoint($id: ID!) {
    getRouteCheckPoint(id: $id) {
      id
      checkPointLatitude
      checkPointLongitude
      checkPointName
      checkPointDay
      routeID
      route {
        id
        sectorID
        sectorName
        sector {
          id
          sectorName
          operatorID
          createdAt
          updatedAt
        }
        routeCheckPoints {
          nextToken
        }
        createdAt
        updatedAt
      }
      checkPointDetails {
        items {
          id
          checkPointDepartureTime
          checkPointBusNumber
          checkPointCount
          routeCheckPointID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listRouteCheckPoints = /* GraphQL */ `
  query ListRouteCheckPoints(
    $filter: ModelRouteCheckPointFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRouteCheckPoints(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        checkPointLatitude
        checkPointLongitude
        checkPointName
        checkPointDay
        routeID
        route {
          id
          sectorID
          sectorName
          createdAt
          updatedAt
        }
        checkPointDetails {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCheckPointDetails = /* GraphQL */ `
  query GetCheckPointDetails($id: ID!) {
    getCheckPointDetails(id: $id) {
      id
      checkPointDepartureTime
      checkPointBusNumber
      checkPointCount
      routeCheckPointID
      routeCheckPoint {
        id
        checkPointLatitude
        checkPointLongitude
        checkPointName
        checkPointDay
        routeID
        route {
          id
          sectorID
          sectorName
          createdAt
          updatedAt
        }
        checkPointDetails {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCheckPointDetailss = /* GraphQL */ `
  query ListCheckPointDetailss(
    $filter: ModelCheckPointDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCheckPointDetailss(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        checkPointDepartureTime
        checkPointBusNumber
        checkPointCount
        routeCheckPointID
        routeCheckPoint {
          id
          checkPointLatitude
          checkPointLongitude
          checkPointName
          checkPointDay
          routeID
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTagsInfo = /* GraphQL */ `
  query GetTagsInfo($id: ID!) {
    getTagsInfo(id: $id) {
      id
      numberOfTags
      durationToExpiryInDays
      price
      operatorID
      sectorsValidity
      createdAt
      updatedAt
    }
  }
`;
export const listTagsInfos = /* GraphQL */ `
  query ListTagsInfos(
    $filter: ModelTagsInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTagsInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        numberOfTags
        durationToExpiryInDays
        price
        operatorID
        sectorsValidity
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserDefaultOperator = /* GraphQL */ `
  query GetUserDefaultOperator($id: ID!) {
    getUserDefaultOperator(id: $id) {
      id
      name
      operatorID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUserDefaultOperators = /* GraphQL */ `
  query ListUserDefaultOperators(
    $filter: ModeluserDefaultOperatorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserDefaultOperators(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        operatorID
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getUserSettings = /* GraphQL */ `
  query GetUserSettings($id: ID!) {
    getUserSettings(id: $id) {
      id
      totalPointsEarned
      totalTrips
      userCategory
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUserSettingss = /* GraphQL */ `
  query ListUserSettingss(
    $filter: ModeluserSettingsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserSettingss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        totalPointsEarned
        totalTrips
        userCategory
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getUserTags = /* GraphQL */ `
  query GetUserTags($id: ID!) {
    getUserTags(id: $id) {
      id
      numberOfTags
      expiryDate
      expiryTime
      operatorID
      sectorID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUserTagss = /* GraphQL */ `
  query ListUserTagss(
    $filter: ModelUserTagsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserTagss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        numberOfTags
        expiryDate
        expiryTime
        operatorID
        sectorID
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getUserScanHistory = /* GraphQL */ `
  query GetUserScanHistory($id: ID!) {
    getUserScanHistory(id: $id) {
      id
      dateScanned
      timeScanned
      idScanned
      status
      numberOfTagsDebited
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUserScanHistorys = /* GraphQL */ `
  query ListUserScanHistorys(
    $filter: ModelUserScanHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserScanHistorys(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        dateScanned
        timeScanned
        idScanned
        status
        numberOfTagsDebited
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
