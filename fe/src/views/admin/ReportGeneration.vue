<template>
  <v-app>
    <v-main class="accent">
      <div class="mx-md-16 mx-sm-2">
        <h2 class="primary--text font-weight-bold mt-12 mb-1">
          Generate Reports
        </h2>
        <h5 class="secondary--text">
          generating reports to downloaded pdf file
        </h5>

        <v-list class="mt-12" nav>
          <v-list-group :value="false" no-action>
            <template v-slot:activator>
              <v-list-item-title>
                <div
                  class="font-weight-bold d-flex align-center justify-space-between"
                >
                  <h4>Patient with Close Contacts</h4>
                </div></v-list-item-title
              >
            </template>
            <v-card flat width="auto">
              <div class="py-4 pl-n6 d-flex justify-space-between">
                <div class="d-flex justify-start width-div">
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        outlined
                        dense
                        filled
                        v-model="date"
                        label="Pick Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        class="ml-n4 mr-3"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
                      @input="handleDate"
                    ></v-date-picker>
                  </v-menu>

                  <v-select
                    v-model="disease_id"
                    :items="diseases"
                    item-text="name"
                    item-value="id"
                    dense
                    label="Disease Type"
                    outlined
                    filled
                    @input="handleSelect"
                  ></v-select>
                </div>
                <v-btn
                  color="primary"
                  outlined
                  class="text-capitalize font-weight-bold pt-5 pb-5"
                  @click="downloadPatient"
                  ><v-icon class="pr-3">cloud_download</v-icon> Download</v-btn
                >
              </div>
            </v-card>
            <v-simple-table class="rounded-lg mb-6">
              <thead>
                <tr class="text-center">
                  <th class="text-left black--text">Patient Name</th>

                  <th class="text-left black--text">Disease Type</th>

                  <th class="text-center black--text">No. of Contacts</th>

                  <th class="text-left black--text text-center">Created At</th>

                  <th class="text-left black--text text-center">
                    Check Contacts
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  class="text-center"
                  v-for="contact in contacts"
                  :key="contact.id"
                >
                  <td
                    class="text-capitalize text-left font-weight-bold primary--text"
                  >
                    {{
                      `${contact.user_account.first_name} ${contact.user_account?.middle_name} ${contact.user_account?.last_name}`
                    }}
                    <div class="secondary--text font-weight-thin">
                      {{ contact.user_account.classification["name"] }}
                    </div>
                  </td>
                  <td class="text-left">{{ contact["disease"]["name"] }}</td>
                  <td class="text-center">{{ contact["contacts"].length }}</td>
                  <td>{{ contact.created_at | filterDate }}</td>
                  <td>
                    <v-btn
                      color="primary"
                      icon
                      @click="
                        $router.push(
                          `/admin/manage/viewtrace/${contact.user_account.id}/${contact.id}`
                        )
                      "
                      ><v-icon>groups</v-icon></v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-list-group>

          <v-list-group :value="false" no-action>
            <template v-slot:activator>
              <v-list-item-title>
                <div
                  class="font-weight-bold d-flex align-center justify-space-between"
                >
                  <h4>Classified Close Contacts</h4>
                </div></v-list-item-title
              >
            </template>
            <v-card flat width="auto">
              <div class="py-4 pl-n6 d-flex justify-space-between">
                <div class="d-flex justify-start width-div">
                  <v-menu
                    v-model="closeContact.menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        outlined
                        dense
                        filled
                        v-model="closeContact.date"
                        label="Pick Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        class="ml-n4 mr-3"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="closeContact.date"
                      @input="handleCloseContactDate"
                    ></v-date-picker>
                  </v-menu>

                  <v-select
                    v-model="closeContact.disease_id"
                    :items="diseases"
                    item-text="name"
                    item-value="id"
                    dense
                    label="Disease Type"
                    outlined
                    filled
                    @input="handleCloseContactSelect"
                  ></v-select>
                </div>
                <v-btn
                  color="primary"
                  outlined
                  class="text-capitalize font-weight-bold pt-5 pb-5"
                  @click="downloadCloseContacts"
                  ><v-icon class="pr-3">cloud_download</v-icon> Download</v-btn
                >
              </div>
            </v-card>
            <v-simple-table class="rounded-lg mb-6">
              <thead>
                <tr class="text-center">
                  <th class="text-left black--text">Name</th>

                  <th class="text-left black--text">Contact with</th>

                  <th class="text-left black--text">Disease Type</th>

                  <th class="text-left black--text text-center">Created At</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  class="text-center"
                  v-for="tagged in taggeds"
                  :key="tagged.id"
                >
                  <td
                    class="text-capitalize text-left font-weight-bold primary--text"
                  >
                    {{
                      `${tagged.user_account.first_name} ${tagged.user_account?.middle_name} ${tagged.user_account?.last_name}`
                    }}
                    <div class="secondary--text font-weight-thin">
                      {{ tagged.user_account.classification["name"] }}
                    </div>
                  </td>
                  <td class="text-left text-capitalize font-weight-bold">
                    {{
                      `${tagged["contact_with"]?.user_patient?.user_account?.first_name} ${tagged["contact_with"]?.user_patient?.user_account?.middle_name}  ${tagged["contact_with"]?.user_patient?.user_account?.last_name}`
                    }}
                    <div class="secondary--text font-weight-thin">
                      {{
                        tagged["contact_with"]?.user_patient?.user_account
                          ?.classification?.name
                      }}
                    </div>
                  </td>
                  <td class="text-left">{{ tagged.disease["name"] }}</td>
                  <td class="text-center">
                    {{ tagged.created_at | filterDate }}
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-list-group>

          <!-- Follow Up Recoreds -->
          <v-list-group :value="false" no-action>
            <template v-slot:activator>
              <v-list-item-title>
                <div
                  class="font-weight-bold d-flex align-center justify-space-between"
                >
                  <h4>Health Declaration Reponses</h4>
                </div></v-list-item-title
              >
            </template>
            <v-card flat>
              <div class="py-4 pl-n6 d-flex justify-space-between">
                <div class="d-flex justify-start width-div">
                  <v-menu
                    v-model="hdr['menu']"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        outlined
                        dense
                        filled
                        v-model="hdr['date']"
                        label="Pick Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        class="ml-n4 mr-3"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="hdr['date']"
                      @input="handleHdrDate"
                    ></v-date-picker>
                  </v-menu>
                </div>
                <v-btn
                  color="primary"
                  outlined
                  class="text-capitalize font-weight-bold pt-5 pb-5"
                  @click="downloadHDR"
                  ><v-icon class="pr-3">cloud_download</v-icon> Download</v-btn
                >
              </div>
            </v-card>
            <v-simple-table class="rounded-lg mb-6">
              <thead>
                <tr class="text-center">
                  <th class="text-left black--text">Name</th>

                  <th class="text-left black--text text-center">Date</th>

                  <th class="text-left black--text text-center">Time</th>

                  <th class="text-left black--text text-center">
                    Check Response
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  class="text-center"
                  v-for="record in records"
                  :key="record.id"
                >
                  <td
                    class="text-left font-weight-bold primary--text text-capitalize"
                  >
                    {{
                      `${record.user_account["first_name"]} ${record.user_account?.middle_name} ${record.user_account?.last_name}`
                    }}
                    <div class="font-weight-thin secondary--text">
                      {{ record["user_account"]["classification"]["name"] }}
                    </div>
                  </td>
                  <td>{{ record.created_at | filterDate }}</td>
                  <td>{{ record.created_at | filterTime }}</td>
                  <td>
                    <v-btn color="primary" icon
                    @click="handleFormDialog(record.answers)"
                      ><v-icon>description</v-icon></v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-list-group>
        </v-list>
      </div>
    </v-main>
    <!-- Form Dialog -->
    <v-dialog v-model="form_dialog" @click:outside="form_dialog = false" width="540">
      <v-card v-for="(response,index) in form_answers" :key="response.id" tile>
        <v-card-title primary-title class="text-justify">
          <h6>{{ `${index + 1}. ${response.question.question}` }}</h6>
        </v-card-title>

        <v-card-text>
          <ul v-if="response.question.sub_question" class="mt-n4">
            <li v-for="(q,index) in handleQuestion(response.question.sub_question)" :key="index">
              <h4>{{q}}</h4>          
            </li>
          </ul>

          <div class="mt-4">
            <v-text-field outlined readonly label="Answer" :value="response.answer == 1 ? `Yes` : `No`"></v-text-field>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import jspdf from "jspdf";
import autoTable from "jspdf-autotable";
export default {
  mounted() {
    this.$store.dispatch("generates/getPatient");
    this.$store.dispatch("disease/getData");
    this.$store.dispatch("generates/submittedResponse");
    this.$store.dispatch("generates/getTaggeds");
  },
  filters: {
    filterDate(val) {
      return moment(val).format("MMM. DD, YYYY").toString();
    },
    filterTime(val) {
      return moment(val).format("hh:mm a").toString();
    },
  },
  computed: {
    ...mapState({
      diseases: (state) => state.disease.all.data,
      contacts: (state) => state.generates.all.data,
      records: (state) => state.generates.submit.data,
      taggeds: (state) => state.generates.taggeds.data,
    }),
  },
  data() {
    return {
      form_answers:[],
      form_dialog:false,
      disease_id: null,
      date: "",
      closeContact: {
        disease_id: null,
        date: "",
        menu: false,
      },
      hdr: {
        date: "",
        menu: false,
      },
      page: 1,
      menu: false,
    };
  },
  methods: {
    handleQuestion(data){
      console.log(data.split(","));
      if(data.trim()){
        const arr = data.split(",")
        return arr
      }
      return []
    },
    handleFormDialog(data){
      this.form_answers = data
      this.form_dialog =  true
    },
    handleDate(data) {
      console.log(data);
      this.$store.dispatch("generates/getDatePatient", { date: data });
      this.menu = false;
    },
    handleCloseContactDate(data) {
      console.log(data);
      this.$store.dispatch("generates/getDateTaggeds", { date: data });
      this.closeContact.menu = false;
    },
    handleHdrDate(data) {
      console.log(data);
      this.$store.dispatch("generates/dateResponse", { date: data });
      this.hdr["menu"] = false;
    },
    handleCloseContactSelect(data) {
      console.log("cc", data);
      if (this.closeContact["date"]) {
        this.$store.dispatch("generates/getDateTaggeds", {
          date: this.closeContact.date,
          disease_id: data,
        });
        return;
      }
      this.$store.dispatch("generates/getDateTaggeds", { disease_id: data });
    },
    handleSelect(data) {
      console.log(data);
      if (this.date) {
        this.$store.dispatch("generates/getDatePatient", {
          date: this.date,
          disease_id: data,
        });
        return;
      }
      this.$store.dispatch("generates/getDatePatient", { disease_id: data });
    },
    // Generete Pdf Buttons
    downloadPatient() {
      const pdf = new jspdf();
      const msg = "Generated Reports";
      const content = "Patient with Close Contacts";

      pdf.setFontSize(16);
      pdf.setFont("helvetica");
      pdf.text(15, 15, msg);

      pdf.setFontSize(16);
      pdf.setFont("helvetica");
      pdf.text(15, 22, content);

      // let crement = 0

      for (const i of this.contacts) {
        // crement +=1
        // pdf.setFontSize(11);
        // pdf.setFont("courier");
        // pdf.text(15 , 38 + crement, `${i.user_account.first_name.toUpperCase()} ${i.user_account?.middle_name ? i.user_account?.middle_name.toUpperCase() : " "} ${i.user_account?.last_name.toUpperCase()}`);

        // pdf.setFontSize(11);
        // pdf.setFont("courier");
        // pdf.text(15 , 40 + crement, `Created At: ${moment(i.created_at).format("MMM. DD, YYYY").toString()}`);
        // pdf.text(120, 40 + crement, `Disease Type : ${i.disease.name}`);

        const newMap = i.contacts.map((m) => {
          console.log("enter", m);
          return {
            patient: `${m.user_patient.user_account?.first_name.toUpperCase()} ${m.user_patient.user_account?.middle_name.toUpperCase()} ${m.user_patient.user_account?.last_name.toUpperCase()} \n ${
              m.user_patient.user_account.classification?.name
            }`,
            name: `${m.user_tagged.user_account.first_name.toUpperCase()} ${
              m.user_tagged.user_account?.middle_name
                ? m.user_tagged.user_account.middle_name.toUpperCase()
                : " "
            } ${m.user_tagged.user_account.last_name.toUpperCase()} \n ${
              m.user_tagged.user_account.classification.name
            }`,
            disease_type: m.user_tagged.disease.name,
            created_at: moment(m.user_tagged.created_at)
              .format("MMM. DD, YYYY")
              .toString(),
          };
        });

        autoTable(pdf, {
          headStyles: {
            fillColor: "#141E61",
            font: "courier",
            fontStyle: "bold",
          },
          columnStyles: {
            name: { font: "courier", valign: "middle" },
            disease_type: { font: "courier" },
            created_at: { font: "courier" },
          },
          margin: {
            top: 45,
          },
          columns: [
            { header: "Patient Name", dataKey: "patient" },
            { header: "Close Contacted", dataKey: "name" },
            { header: "Disease Type", dataKey: "disease_type" },
            { header: "Created At", dataKey: "created_at" },
          ],
          body: newMap,
        });
      }

      if (this.date.trim() == "" && this.disease_id) {
        const find = this.diseases.find((f) => f.id == this.disease_id);
        pdf.save(`${find.name}-patient-with-close-contacts.pdf`);
      } else if (this.date && !this.disease_id) {
        pdf.save(`${this.date}-patient-with-close-contacts.pdf`);
      } else if (this.date && this.disease_id) {
        const find = this.diseases.find((f) => f.id == this.disease_id);
        pdf.save(`${this.date}-${find.name}-patient-with-close-contacts.pdf`);
      } else {
        pdf.save(`all-patient-with-close-contacts.pdf`);
      }
    },

    downloadCloseContacts() {
      const newMap = this.taggeds.map((m) => {
        return {
          name: `${m.user_account.first_name.toUpperCase()} ${
            m.user_account?.middle_name
              ? m.user_account.middle_name.toUpperCase()
              : " "
          } ${m.user_account.last_name.toUpperCase()} \t ${
            m.user_account.classification.name
          }`,
          contact_with: `${m.contact_with?.user_patient?.user_account.first_name.toUpperCase()} ${
            m.contact_with?.user_patient?.user_account?.middle_name
              ? m.contact_with?.user_patient?.user_account.middle_name.toUpperCase()
              : " "
          } ${m.contact_with?.user_patient?.user_account.last_name.toUpperCase()} \t ${
            m.user_account.classification.name
          }`,
          disease_type: m.disease.name,
          created_at: moment(m.created_at).format("MMM. DD, YYYY").toString(),
        };
      });

      const pdf = new jspdf();
      const msg = "Generated Reports";
      const content = "Classified Close Contacts";

      pdf.setFontSize(16);
      pdf.setFont("helvetica");
      pdf.text(15, 15, msg);

      pdf.setFontSize(16);
      pdf.setFont("helvetica");
      pdf.text(15, 22, content);

      autoTable(pdf, {
        headStyles: { fillColor: "#141E61" },
        margin: {
          top: 45,
        },
        columns: [
          { header: "Name", dataKey: "name" },
          { header: "Contact With", dataKey: "contact_with" },
          { header: "Disease Type", dataKey: "disease_type" },
          { header: "Created At", dataKey: "created_at" },
        ],
        body: newMap,
      });

      if (this.closeContact.date.trim() == "" && this.closeContact.disease_id) {
        const find = this.diseases.find(
          (f) => f.id == this.closeContact.disease_id
        );
        pdf.save(`${find.name}-classified-close-contacts.pdf`);
      } else if (this.closeContact.date && !this.closeContact.disease_id) {
        pdf.save(`${this.closeContact.date}-classified-close-contacts.pdf`);
      } else if (this.closeContact["date"] && this.closeContact.disease_id) {
        const find = this.diseases.find(
          (f) => f.id == this.closeContact.disease_id
        );
        pdf.save(
          `${this.closeContact["date"]}-${find.name}-classified-close-contacts.pdf`
        );
      } else {
        pdf.save(`all-classified-close-contacts.pdf`);
      }
    },
    downloadHDR() {
      const newMap = this.records.map((m) => {
        let num = 0;
        const obj = {};

        for (const key of m.answers) {
          num += 1;
          obj[`Question No. ${num}`] = key.answer ? "Yes" : "No";
        }
        obj["time"] = moment(m.created_at).format("hh:mm a").toString();
        obj["date"] = moment(m.created_at).format("MMM. DD, YYYY").toString();
        obj["name"] = `${m.user_account.first_name.toUpperCase()} ${
          m.user_account?.middle_name
            ? m.user_account.middle_name.toUpperCase()
            : " "
        } ${m.user_account.last_name.toUpperCase()}`;
        return obj;
      });

      let numColumns = -1;
      const columns = [];

      if (newMap.length) {
        for (const key of Object.keys(newMap[0]).reverse()) {
          numColumns += 1;
          columns[numColumns] = {
            header: key.toString().toUpperCase(),
            dataKey: key,
          };
        }
      }

      const pdf = new jspdf();
      const msg = "Generated Reports";
      const content = "Health Declaration Responses";

      pdf.setFontSize(16);
      pdf.setFont("helvetica");
      pdf.text(15, 15, msg);

      pdf.setFontSize(16);
      pdf.setFont("helvetica");
      pdf.text(15, 22, content);

      autoTable(pdf, {
        headStyles: { fillColor: "#141E61" },
        margin: {
          top: 45,
        },
        columns: columns,
        body: newMap.reverse(),
      });

      if (this.hdr.date.trim() == "") {
        pdf.save("All-HDR.pdf");
        return;
      }

      pdf.save(`${this.hdr.date}-HD.pdf`);
    },
  },
};
</script>

<style scoped>
.bg {
  background-color: #f8f0f0;
}
.adj {
  width: 280px;
}
.width-div {
  width: 460px;
}
</style>
