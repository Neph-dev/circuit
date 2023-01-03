/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOperator = /* GraphQL */ `
  subscription OnCreateOperator {
    onCreateOperator {
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
export const onUpdateOperator = /* GraphQL */ `
  subscription OnUpdateOperator {
    onUpdateOperator {
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
export const onDeleteOperator = /* GraphQL */ `
  subscription OnDeleteOperator {
    onDeleteOperator {
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
export const onCreateSector = /* GraphQL */ `
  subscription OnCreateSector {
    onCreateSector {
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
export const onUpdateSector = /* GraphQL */ `
  subscription OnUpdateSector {
    onUpdateSector {
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
export const onDeleteSector = /* GraphQL */ `
  subscription OnDeleteSector {
    onDeleteSector {
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
export const onCreateRoute = /* GraphQL */ `
  subscription OnCreateRoute {
    onCreateRoute {
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
export const onUpdateRoute = /* GraphQL */ `
  subscription OnUpdateRoute {
    onUpdateRoute {
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
export const onDeleteRoute = /* GraphQL */ `
  subscription OnDeleteRoute {
    onDeleteRoute {
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
export const onCreateRouteCheckPoint = /* GraphQL */ `
  subscription OnCreateRouteCheckPoint {
    onCreateRouteCheckPoint {
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
export const onUpdateRouteCheckPoint = /* GraphQL */ `
  subscription OnUpdateRouteCheckPoint {
    onUpdateRouteCheckPoint {
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
export const onDeleteRouteCheckPoint = /* GraphQL */ `
  subscription OnDeleteRouteCheckPoint {
    onDeleteRouteCheckPoint {
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
export const onCreateCheckPointDetails = /* GraphQL */ `
  subscription OnCreateCheckPointDetails {
    onCreateCheckPointDetails {
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
export const onUpdateCheckPointDetails = /* GraphQL */ `
  subscription OnUpdateCheckPointDetails {
    onUpdateCheckPointDetails {
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
export const onDeleteCheckPointDetails = /* GraphQL */ `
  subscription OnDeleteCheckPointDetails {
    onDeleteCheckPointDetails {
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
export const onCreateTagsInfo = /* GraphQL */ `
  subscription OnCreateTagsInfo {
    onCreateTagsInfo {
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
export const onUpdateTagsInfo = /* GraphQL */ `
  subscription OnUpdateTagsInfo {
    onUpdateTagsInfo {
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
export const onDeleteTagsInfo = /* GraphQL */ `
  subscription OnDeleteTagsInfo {
    onDeleteTagsInfo {
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
export const onCreateUserDefaultOperator = /* GraphQL */ `
  subscription OnCreateUserDefaultOperator($owner: String!) {
    onCreateUserDefaultOperator(owner: $owner) {
      id
      name
      operatorID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateUserDefaultOperator = /* GraphQL */ `
  subscription OnUpdateUserDefaultOperator($owner: String!) {
    onUpdateUserDefaultOperator(owner: $owner) {
      id
      name
      operatorID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteUserDefaultOperator = /* GraphQL */ `
  subscription OnDeleteUserDefaultOperator($owner: String!) {
    onDeleteUserDefaultOperator(owner: $owner) {
      id
      name
      operatorID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateUserSettings = /* GraphQL */ `
  subscription OnCreateUserSettings($owner: String!) {
    onCreateUserSettings(owner: $owner) {
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
export const onUpdateUserSettings = /* GraphQL */ `
  subscription OnUpdateUserSettings($owner: String!) {
    onUpdateUserSettings(owner: $owner) {
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
export const onDeleteUserSettings = /* GraphQL */ `
  subscription OnDeleteUserSettings($owner: String!) {
    onDeleteUserSettings(owner: $owner) {
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
export const onCreateUserTags = /* GraphQL */ `
  subscription OnCreateUserTags($owner: String!) {
    onCreateUserTags(owner: $owner) {
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
export const onUpdateUserTags = /* GraphQL */ `
  subscription OnUpdateUserTags($owner: String!) {
    onUpdateUserTags(owner: $owner) {
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
export const onDeleteUserTags = /* GraphQL */ `
  subscription OnDeleteUserTags($owner: String!) {
    onDeleteUserTags(owner: $owner) {
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
export const onCreateUserScanHistory = /* GraphQL */ `
  subscription OnCreateUserScanHistory($owner: String!) {
    onCreateUserScanHistory(owner: $owner) {
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
export const onUpdateUserScanHistory = /* GraphQL */ `
  subscription OnUpdateUserScanHistory($owner: String!) {
    onUpdateUserScanHistory(owner: $owner) {
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
export const onDeleteUserScanHistory = /* GraphQL */ `
  subscription OnDeleteUserScanHistory($owner: String!) {
    onDeleteUserScanHistory(owner: $owner) {
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
