/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOperator = /* GraphQL */ `
  mutation CreateOperator(
    $input: CreateOperatorInput!
    $condition: ModelOperatorConditionInput
  ) {
    createOperator(input: $input, condition: $condition) {
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
export const updateOperator = /* GraphQL */ `
  mutation UpdateOperator(
    $input: UpdateOperatorInput!
    $condition: ModelOperatorConditionInput
  ) {
    updateOperator(input: $input, condition: $condition) {
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
export const deleteOperator = /* GraphQL */ `
  mutation DeleteOperator(
    $input: DeleteOperatorInput!
    $condition: ModelOperatorConditionInput
  ) {
    deleteOperator(input: $input, condition: $condition) {
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
export const createSector = /* GraphQL */ `
  mutation CreateSector(
    $input: CreateSectorInput!
    $condition: ModelSectorConditionInput
  ) {
    createSector(input: $input, condition: $condition) {
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
          routeName
          lineNumber
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
export const updateSector = /* GraphQL */ `
  mutation UpdateSector(
    $input: UpdateSectorInput!
    $condition: ModelSectorConditionInput
  ) {
    updateSector(input: $input, condition: $condition) {
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
          routeName
          lineNumber
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
export const deleteSector = /* GraphQL */ `
  mutation DeleteSector(
    $input: DeleteSectorInput!
    $condition: ModelSectorConditionInput
  ) {
    deleteSector(input: $input, condition: $condition) {
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
          routeName
          lineNumber
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
export const createRoute = /* GraphQL */ `
  mutation CreateRoute(
    $input: CreateRouteInput!
    $condition: ModelRouteConditionInput
  ) {
    createRoute(input: $input, condition: $condition) {
      id
      routeName
      lineNumber
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
export const updateRoute = /* GraphQL */ `
  mutation UpdateRoute(
    $input: UpdateRouteInput!
    $condition: ModelRouteConditionInput
  ) {
    updateRoute(input: $input, condition: $condition) {
      id
      routeName
      lineNumber
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
export const deleteRoute = /* GraphQL */ `
  mutation DeleteRoute(
    $input: DeleteRouteInput!
    $condition: ModelRouteConditionInput
  ) {
    deleteRoute(input: $input, condition: $condition) {
      id
      routeName
      lineNumber
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
export const createRouteCheckPoint = /* GraphQL */ `
  mutation CreateRouteCheckPoint(
    $input: CreateRouteCheckPointInput!
    $condition: ModelRouteCheckPointConditionInput
  ) {
    createRouteCheckPoint(input: $input, condition: $condition) {
      id
      checkPointLatitude
      checkPointLongitude
      checkPointName
      checkPointDay
      routeID
      route {
        id
        routeName
        lineNumber
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
          checkPointCount
          checkPointNumber
          nextCheckPointDetailsID
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
export const updateRouteCheckPoint = /* GraphQL */ `
  mutation UpdateRouteCheckPoint(
    $input: UpdateRouteCheckPointInput!
    $condition: ModelRouteCheckPointConditionInput
  ) {
    updateRouteCheckPoint(input: $input, condition: $condition) {
      id
      checkPointLatitude
      checkPointLongitude
      checkPointName
      checkPointDay
      routeID
      route {
        id
        routeName
        lineNumber
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
          checkPointCount
          checkPointNumber
          nextCheckPointDetailsID
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
export const deleteRouteCheckPoint = /* GraphQL */ `
  mutation DeleteRouteCheckPoint(
    $input: DeleteRouteCheckPointInput!
    $condition: ModelRouteCheckPointConditionInput
  ) {
    deleteRouteCheckPoint(input: $input, condition: $condition) {
      id
      checkPointLatitude
      checkPointLongitude
      checkPointName
      checkPointDay
      routeID
      route {
        id
        routeName
        lineNumber
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
          checkPointCount
          checkPointNumber
          nextCheckPointDetailsID
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
export const createCheckPointDetails = /* GraphQL */ `
  mutation CreateCheckPointDetails(
    $input: CreateCheckPointDetailsInput!
    $condition: ModelCheckPointDetailsConditionInput
  ) {
    createCheckPointDetails(input: $input, condition: $condition) {
      id
      checkPointDepartureTime
      checkPointCount
      checkPointNumber
      nextCheckPointDetailsID
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
          routeName
          lineNumber
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
export const updateCheckPointDetails = /* GraphQL */ `
  mutation UpdateCheckPointDetails(
    $input: UpdateCheckPointDetailsInput!
    $condition: ModelCheckPointDetailsConditionInput
  ) {
    updateCheckPointDetails(input: $input, condition: $condition) {
      id
      checkPointDepartureTime
      checkPointCount
      checkPointNumber
      nextCheckPointDetailsID
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
          routeName
          lineNumber
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
export const deleteCheckPointDetails = /* GraphQL */ `
  mutation DeleteCheckPointDetails(
    $input: DeleteCheckPointDetailsInput!
    $condition: ModelCheckPointDetailsConditionInput
  ) {
    deleteCheckPointDetails(input: $input, condition: $condition) {
      id
      checkPointDepartureTime
      checkPointCount
      checkPointNumber
      nextCheckPointDetailsID
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
          routeName
          lineNumber
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
export const createTagsInfo = /* GraphQL */ `
  mutation CreateTagsInfo(
    $input: CreateTagsInfoInput!
    $condition: ModelTagsInfoConditionInput
  ) {
    createTagsInfo(input: $input, condition: $condition) {
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
export const updateTagsInfo = /* GraphQL */ `
  mutation UpdateTagsInfo(
    $input: UpdateTagsInfoInput!
    $condition: ModelTagsInfoConditionInput
  ) {
    updateTagsInfo(input: $input, condition: $condition) {
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
export const deleteTagsInfo = /* GraphQL */ `
  mutation DeleteTagsInfo(
    $input: DeleteTagsInfoInput!
    $condition: ModelTagsInfoConditionInput
  ) {
    deleteTagsInfo(input: $input, condition: $condition) {
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
export const createUserDefaultOperator = /* GraphQL */ `
  mutation CreateUserDefaultOperator(
    $input: CreateUserDefaultOperatorInput!
    $condition: ModeluserDefaultOperatorConditionInput
  ) {
    createUserDefaultOperator(input: $input, condition: $condition) {
      id
      name
      operatorID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateUserDefaultOperator = /* GraphQL */ `
  mutation UpdateUserDefaultOperator(
    $input: UpdateUserDefaultOperatorInput!
    $condition: ModeluserDefaultOperatorConditionInput
  ) {
    updateUserDefaultOperator(input: $input, condition: $condition) {
      id
      name
      operatorID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteUserDefaultOperator = /* GraphQL */ `
  mutation DeleteUserDefaultOperator(
    $input: DeleteUserDefaultOperatorInput!
    $condition: ModeluserDefaultOperatorConditionInput
  ) {
    deleteUserDefaultOperator(input: $input, condition: $condition) {
      id
      name
      operatorID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createUserSettings = /* GraphQL */ `
  mutation CreateUserSettings(
    $input: CreateUserSettingsInput!
    $condition: ModeluserSettingsConditionInput
  ) {
    createUserSettings(input: $input, condition: $condition) {
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
export const updateUserSettings = /* GraphQL */ `
  mutation UpdateUserSettings(
    $input: UpdateUserSettingsInput!
    $condition: ModeluserSettingsConditionInput
  ) {
    updateUserSettings(input: $input, condition: $condition) {
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
export const deleteUserSettings = /* GraphQL */ `
  mutation DeleteUserSettings(
    $input: DeleteUserSettingsInput!
    $condition: ModeluserSettingsConditionInput
  ) {
    deleteUserSettings(input: $input, condition: $condition) {
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
export const createUserTags = /* GraphQL */ `
  mutation CreateUserTags(
    $input: CreateUserTagsInput!
    $condition: ModelUserTagsConditionInput
  ) {
    createUserTags(input: $input, condition: $condition) {
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
export const updateUserTags = /* GraphQL */ `
  mutation UpdateUserTags(
    $input: UpdateUserTagsInput!
    $condition: ModelUserTagsConditionInput
  ) {
    updateUserTags(input: $input, condition: $condition) {
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
export const deleteUserTags = /* GraphQL */ `
  mutation DeleteUserTags(
    $input: DeleteUserTagsInput!
    $condition: ModelUserTagsConditionInput
  ) {
    deleteUserTags(input: $input, condition: $condition) {
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
export const createUserScanHistory = /* GraphQL */ `
  mutation CreateUserScanHistory(
    $input: CreateUserScanHistoryInput!
    $condition: ModelUserScanHistoryConditionInput
  ) {
    createUserScanHistory(input: $input, condition: $condition) {
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
export const updateUserScanHistory = /* GraphQL */ `
  mutation UpdateUserScanHistory(
    $input: UpdateUserScanHistoryInput!
    $condition: ModelUserScanHistoryConditionInput
  ) {
    updateUserScanHistory(input: $input, condition: $condition) {
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
export const deleteUserScanHistory = /* GraphQL */ `
  mutation DeleteUserScanHistory(
    $input: DeleteUserScanHistoryInput!
    $condition: ModelUserScanHistoryConditionInput
  ) {
    deleteUserScanHistory(input: $input, condition: $condition) {
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
