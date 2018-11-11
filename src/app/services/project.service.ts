import {Injectable} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import {Project} from '../models/project.model';
import {KeyMilestone} from '../models/key-milestone/key-milestone.model';
import {Router, ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projectsCollection: AngularFirestoreCollection<Project>;
  projectDoc: AngularFirestoreDocument<Project>;
  projects: Observable<Project[]>;
  keyMilestones: Observable<KeyMilestone[]>;
  project: Observable<Project>;
  projectChanged = new Subject();

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projectsCollection = this.afs.collection('projects', ref =>
      ref.orderBy('name', 'asc')
    );
  }

  getProjects(): Observable<Project[]> {
    this.projects = this.projectsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Project;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );

    return this.projects;
  }

  newProject(project: Project) {
    this.projectsCollection.add(project).then(data => {
      this.router.navigate([`projects/${data.id}`], {relativeTo: this.route});
    });
  }

  getProject(id: string): Observable<Project> {
    this.projectDoc = this.afs.doc<Project>(`projects/${id}`);
    this.project = this.projectDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Project;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.project;
  }

  updateProject(id: string, project: Project) {
    this.projectDoc = this.afs.doc(`projects/${id}`);
    this.projectDoc
      .update(project)
      .then(() => {
        this.router.navigate([`projects/${id}`]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  archiveProject(id: string) {
    this.projectDoc = this.afs.doc(`projects/${id}`);
    this.projectDoc
      .update({archived: true})
      .then(() => {
        this.router.navigate([`/`]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateKeyMilestoneDate(projectId, keyMilestones) {
    // this.afs.doc('images/'+galleryId + '/images/' + imageId).update({"name": upload.name,"path": upload.url});
    this.projectDoc = this.afs.doc(`projects/${projectId}`);
    this.projectDoc
      .update({keyMilestones: keyMilestones})
      .then(() => {
        // this.router.navigate([`/`]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  restoreProject(id: string) {
    this.projectDoc = this.afs.doc(`projects/${id}`);
    this.projectDoc
      .update({archived: false})
      .then(() => {
        // do something
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteProject(project: Project) {
    this.projectDoc = this.afs.doc(`projects/${project.id}`);
    this.projectDoc
      .delete()
      .then(() => {
        this.router.navigate([`/`]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getWisiwigConfiguration() {
    const options: Object = {
      charCounterCount: true /** CHARACTER COUNT FOR SUMMARY */,
      toolbarButtons: ['bold', 'italic', 'underline', 'fontSize', 'color'],
      toolbarButtonsXS: ['bold', 'italic', 'underline', 'fontSize', 'color'],
      toolbarButtonsSM: ['bold', 'italic', 'underline', 'fontSize', 'color'],
      toolbarButtonsMD: ['bold', 'italic', 'underline', 'fontSize', 'color']
    };
    return options;
  }
}

/*
1. clientsCollection.snapshotChanges() - return collection with id
2. action.payload.doc.data() - return data inside a document
3. clientsCollection.add(client) - add data
4. this.afs.doc<Client>(`clients/${id}`) - get ONE item
5.
*/
