import { createLocalDatabase } from '@tinacms/datalayer'

// Since we're using local database, export it as the database client
export default createLocalDatabase()