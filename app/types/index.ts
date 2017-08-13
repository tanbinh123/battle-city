export { default as TankRecord, PlainTankRecord } from 'types/TankRecord'
export { default as FlickerRecord } from 'types/FlickerRecord'
export { default as TextRecord } from 'types/TextRecord'
export { default as BulletRecord } from 'types/BulletRecord'
export { default as PlayerRecord } from 'types/PlayerRecord'
export { default as MapRecord, mapRecord, PlainMapRecord } from 'types/MapRecord'
export { default as EagleRecord, eagleRecord, PlainEagleRecord } from 'types/EagleRecord'
export { State } from 'reducers/index'
export { PlayersMap } from 'reducers/players'
export { BulletsMap } from 'reducers/bullets'
export { TextsMap } from 'reducers/texts'
export { TanksMap } from 'reducers/tanks'

import { PlainTankRecord } from 'types/TankRecord'
import { PlainMapRecord } from 'types/MapRecord'

export interface HumanControllerConfig {
  fire: string,
  up: string,
  down: string,
  left: string,
  right: string,
}

export type Input = { type: 'turn', direction: Direction }
  | { type: 'forward', maxDistance?: number }

declare global {
  interface Box {
    x: number,
    y: number,
    width: number,
    height: number,
  }

  interface Point {
    x: number
    y: number
  }

  interface Vector {
    dx: number
    dy: number
  }

  interface StageConfig {
    name: string
    difficulty: number
    map: string[]
    /** 敌人描述, 例如: 20\*basic, 10\*fast */
    enemies: string[]
  }

  type PowerUpName = 'tank' | 'star' | 'grenade' | 'timer' | 'helmet' | 'shovel'

  type Overlay = '' | 'gameover' | 'statistics'

  type TankLevel = 'basic' | 'fast' | 'power' | 'armor'
  type TankColor = 'green' | 'yellow' | 'silver' | 'red' | 'auto'

  type Direction = 'up' | 'down' | 'left' | 'right'

  type TankId = number
  type BulletId = number
  type KillCount = number

  /**
   * 玩家名称.
   * human-player的名称格式为 'player-x', 而AI-player的名称格式为 'AI-x'
   * 其实x表示数字1,2,3...
   */
  type PlayerName = string
  type TextId = number
  type FlickerId = number

  type SteelIndex = number
  type BrickIndex = number
  type RiverIndex = number

  type ExplosionType = 'bullet' | 'tank'
  type ExplosionId = number
  type Side = 'human' | 'ai'

  type AICommand = AICommand.AICommand

  /** AICommand 包含了一些AI逻辑向游戏逻辑发送的操作命令 */
  namespace AICommand {
    type AICommand = Forward | Fire | Turn | Query

    interface Forward {
      type: 'forward'
      forwardLength: number
    }

    interface Fire {
      type: 'fire'
    }

    interface Turn {
      type: 'turn'
      direction: Direction
    }

    interface Query {
      type: 'query'
      query: 'my-tank' | 'map' | 'tanks'
    }
  }

  /** Note 包含了一些游戏逻辑向AI逻辑发送的消息/通知 */
  type Note = Note.Note

  namespace Note {
    type Note = BulletComplete | Reach | QueryResultNote

    interface BulletComplete {
      type: 'bullet-complete'
    }

    interface Reach {
      type: 'reach'
    }

    interface QueryResultNote {
      type: 'query-result'
      result: QueryResult
    }
  }

  type QueryResult = QueryResult.QueryResult

  namespace QueryResult {
    type QueryResult = MapInfo | MyTankInfo | TanksInfo

    interface MyTankInfo {
      type: 'my-tank-info'
      tank: PlainTankRecord
    }

    interface MapInfo {
      type: 'map-info'
      map: PlainMapRecord
    }

    interface TanksInfo {
      type: 'tanks-info'
      tanks: PlainTankRecord[]
    }
  }
}