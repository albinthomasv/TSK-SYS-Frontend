import { Component, OnInit, OnDestroy } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared.module';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, forkJoin } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { LoaderService } from '../../../services/common/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit, OnDestroy {

  public taskForm!: FormGroup
  public submitted: boolean = false;
  public formAction: string = "Create New";
  private subscriptions = new Subscription();
  public page: number = 1;
  public perPage: number = 1;
  public filterByStatus: string = "pending";
  public sortBy="created_at";
  public orderBy: string = "desc";
  public tasks: any = [];
  public taskEditSlug:string="";
  public TotalPages:number=1;

/**
 * Initializes a new instance of the TasksComponent class.
 * 
 * @param formBuilder - Injected FormBuilder service for creating form groups.
 * @param taskService - Injected TaskService for handling task-related operations.
 * @param loader - Injected LoaderService for managing loading indicators.
 */

  constructor(private formBuilder: FormBuilder,
    private taskService: TaskService,
    private loader: LoaderService) { }
  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * Initializes the form group and loads all tasks.
   */
  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
      status: new FormControl('', [])
    })
    this.loader.loaderStatus.emit(true)
    this.getAllTasks();
  }
  /**
   * Lifecycle hook that is called when a directive, pipe, or service is destroyed.
   * Unsubscribes from all subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
  /**
   * Submits the task form.
   * 
   * If the form is valid, and the form action is "Create New", the task is added.
   * If the form action is "Update", the task is updated.
   * 
   * The loading indicator is displayed while the task is being added/updated.
   * 
   * @remarks
   * When the form is submitted, the submitted flag is set to true.
   * If the form is valid, the loading indicator is displayed, and the task is added/updated.
   * If the form is invalid, the submitted flag is set to true, and the form errors are displayed.
   */

    this.submitted = true;
    if (this.taskForm.valid) {
      this.loader.loaderStatus.next(true);
      if (this.formAction == "Create New") {
        this.addTask();
      } else {
        this.updateTask();
      }
    }


  }

  /**
   * Submits the task form for adding a new task.
   * 
   * @remarks
   * This method is called when the form action is "Create New".
   * It calls the createTask method of the task service to add the new task.
   * 
   * If the task is successfully added, the form is reset, the submitted flag is set to false,
   * and the form action is set to "Create New".
   * The loading indicator is also hidden.
   * 
   * If there is an error while adding the task, the loading indicator is hidden.
   */
  addTask() {
    this.subscriptions.add(this.taskService.createTask(this.taskForm.value).subscribe((res: any) => {
      if (res?.success) {
        this.taskForm.reset();
        this.submitted = false;
        this.formAction = "Create New";
        this.getAllTasks("New Task successfully added")

      }
    },
      (error: any) => {
        this.loader.loaderStatus.emit(false);
      }))
  }

  updateTask(){
   
    this.subscriptions.add(this.taskService.updateTask(this.taskForm?.value,this.taskEditSlug).subscribe((res:any)=>{
      if (res?.success) {
        this.taskForm.reset();
        this.submitted = false;
        this.formAction = "Create New";
        this.getAllTasks("Task successfully updated")
        this.performAddAction();

      }
    },()=>{
      this.loader.loaderStatus.emit(false);
    }))
  }

  /**
   * Gets all tasks.
   * 
   * @param message - Optional message to be displayed when the tasks are successfully loaded.
   * 
   * @remarks
   * This method calls the getAllTasks method of the task service to get all tasks.
   * The loading indicator is displayed while the tasks are being loaded.
   * 
   * If the tasks are successfully loaded, the tasks are assigned to the tasks property,
   * the loading indicator is hidden, and the message is displayed if provided.
   * 
   * If there is an error while loading the tasks, the loading indicator is hidden.
   */
  getAllTasks(message = ""): void {
    this.subscriptions.add(forkJoin([this.taskService.getAllTasks(this.page, this.perPage, this.filterByStatus, this.orderBy,this.sortBy)]).subscribe((res: any) => {
      if (res[0]?.success) {
        this.tasks = res[0]?.data;
        this.TotalPages=res[0]?.data?.total;
        
        
        this.loader.loaderStatus.next(false);
        if (message) {
          this.loader.toastSuccess(message);
        }

      }

    }, () => {
      this.loader.loaderStatus.emit(false)
    }))
  }

/**
 * Initiates the edit action for a task.
 * 
 * Sets the form action to "Update", making the task form ready for editing.
 * Adds a required validator to the task status field and updates the form's validity.
 * Patches the form with the values of the provided task, allowing the user to edit the task details.
 * 
 * @param task - The task object containing the details to be edited.
 */

  performEditAction(task: any) {
    this.formAction = "Update";
    this.taskForm.get('status')?.addValidators([Validators.required])
    this.taskForm.updateValueAndValidity();
    this.taskForm.patchValue({ title: task?.title, description: task?.description, status: task?.status });
    this.taskEditSlug=task?.slug;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Initiates the add action for a task.
   * 
   * Sets the form action to "Create New", making the task form ready for adding a new task.
   * Removes the required validator from the task status field and updates the form's validity.
   */
  performAddAction() {
    this.formAction = "Create New";
    this.taskForm.get('status')?.removeValidators([Validators.required]);
    this.taskForm.updateValueAndValidity();
    this.taskEditSlug="";
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  /**
   * Initiates the delete action for a task.
   * 
   * Shows a confirmation dialog and, if confirmed, deletes the task with the given slug.
   * 
   * @param slug - The slug of the task to be deleted.
   */
  taskDelete(slug: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader.loaderStatus.emit(true);
        this.subscriptions.add(this.taskService.deleteTask(slug).subscribe((res: any) => {
          if (res?.success) {
            this.getAllTasks("Task successfully deleted")
          }
          this.loader.loaderStatus.emit(false)
        }, () => {
          this.loader.loaderStatus.emit(false)
        }))
      }
    })
  }

  /**
   * Sets the sort for tasks and fetches the tasks.
   * 
   * @param event - The event object containing the selected sort value.
   * 
   * @remarks
   * This method is triggered when the sort changes. It updates the `sortBy` with the selected sort.
   * The loading indicator is displayed while the tasks are being fetched.
   */
  setSortBy(event:any){
    this.page=1;
    this.sortBy=event?.target?.value;
    this.loader.loaderStatus.emit(true)
    this.getAllTasks();

  }

/**
 * Sets the order for tasks and fetches the tasks.
 * 
 * @param event - The event object containing the selected order value.
 * 
 * @remarks
 * This method is triggered when the order changes. It updates the `orderBy` with the selected order.
 * The loading indicator is displayed while the tasks are being fetched.
 */

  setOrderBy(event:any){
  
    this.orderBy=event?.target?.value;
    this.loader.loaderStatus.emit(true)
    this.getAllTasks();

  }

/**
 * Sets the filter for tasks based on their status and fetches the tasks.
 * 
 * @param event - The event object containing the selected status value.
 * 
 * @remarks
 * This method is triggered when the filter status changes. It resets the pagination to the first page
 * and updates the `filterByStatus` with the selected status. The loading indicator is displayed while 
 * the tasks are being fetched.
 */

  setFilterByStatus(event:any){
    this.page=1;
    this.filterByStatus=event?.target?.value;
    this.loader.loaderStatus.emit(true)
    this.getAllTasks();
  }

  /**
   * Loads tasks with pagination.
   * 
   * @param page - The page number to be loaded. Defaults to 1.
   * @param increment - If true, increments the current page number by 1 and loads the tasks. Defaults to false.
   * 
   * @remarks
   * If increment is true, checks if the new page number is within the total number of pages.
   * If it is, increments the current page number and loads the tasks.
   * If increment is false, sets the current page number to the provided page number and loads the tasks.
   */
  loadWithPagination(page:number=1,increment:boolean=false){
    if(increment ){
      if(((this.page+1)<=this.TotalPages)){
        this.page++;
        this.getAllTasks()
      }

    }else{
      this.page=page;
      this.getAllTasks()
    }
  }

/**
 * Calculates the serial number of a task in the current page.
 *
 * @param index - The index of the task in the current page, starting from 1.
 * @returns The serial number of the task, which is its position in the overall list of tasks.
 *
 * @remarks
 * The serial number is calculated based on the current page, the number of tasks per page,
 * and the given index of the task within the current page.
 */

  calculateSerialNumber( index:number=1) {
    return (this.page - 1) * this.perPage + index + 1;
  }
}
