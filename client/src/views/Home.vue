<template>
  <div class="home">
   <Header  title="List of Clients"/>
 <v-data-table
    :headers="headers"
    :items="clients"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Clients</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Client
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="4">
                    <v-subheader>Name</v-subheader>
                 </v-col>
                <v-col cols="8">
                    <v-text-field
                      v-model="editedItem.name"
                    ></v-text-field>
                  </v-col>
                   </v-row>
                  <v-row>
                   <v-col cols="4">
                    <v-subheader>Email</v-subheader>
                 </v-col>
                <v-col cols="8">
                    <v-text-field
                      v-model="editedItem.email"
                      type="email"
                    ></v-text-field>
                  </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4">
                    <v-subheader>Phone</v-subheader>
                 </v-col>
                <v-col cols="8">
                    <v-text-field
                      v-model="editedItem.phone"
                      type="phone"
                    ></v-text-field>
                  </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4">
                    <v-subheader>Providers</v-subheader>
                 </v-col>
                <v-col cols="8">
                  <v-combobox :return-object="true"
                    v-model="editedItem.providers"
                    :items="providersData"
                    item-text="name"
                    item-value="_id"
                    multiple
                ></v-combobox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.providers="{ item }">
      {{ item.providers.map(s => s.name).join(', ') }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    
  </v-data-table>

  </div>


  
</template>

<script>
// @ is an alias to /src

import Header from '../components/Header'
import API from '../api'
export default {
  name: 'Home',
   components: {
    Header,
  },
  data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
        { text: 'Providers', value: 'providers' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      clients: [],
      providersData: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        phone: 0,
        providers: [],
      },
      defaultItem: {
        name: '',
        email: '',
        phone: 0,
        providers: [],
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Client' : 'Edit Client'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        API.getAllClients().then((data) => {
        this.clients = data.clients;
        this.providersData = data.providers;
        });
      },

      editItem (item) {
        this.editedIndex = this.clients.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
       
      },

      deleteItem (item) {
        this.editedIndex = this.clients.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.clients.splice(this.editedIndex, 1)
        API.deleteClient(this.editedItem._id).then((data) => {
           this.initialize()
        });
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.clients[this.editedIndex], this.editedItem)
         API.updateClient(this.editedItem._id,this.editedItem).then((data) => {
          
        });
        } else {
          this.clients.push(this.editedItem)
          API.addClient(this.editedItem).then((data) => {
          
        });
        }
        this.initialize()
        this.close()
      },
    },
}
</script>
